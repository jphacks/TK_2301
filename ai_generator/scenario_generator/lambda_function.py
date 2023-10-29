import json
from base64 import b64decode
import base64
from urllib.parse import parse_qs
import os
import boto3

import openai
from calcToken import calcBilling

def generationSentence(prompt, user_input, param):
	message_list = [{"role": "system", "content": "あなたはマーダーミステリーのシナリオ作家です。\n" + prompt}]
	message_list.append({"role": "user", "content": str(user_input)})
	response = openai.ChatCompletion.create(
		messages = message_list,
		model = param["model"],
		max_tokens = param["max_tokens"],
		temperature = param["temperature"],
		stop = param["stop"]
	)
	return response["choices"][0]["message"]["content"]

def lambda_handler(event, context):

	# POSTリクエストの解析
	post = event["body"]
	post = json.loads(post)
	phase = post["phase"]

	# 暗号化された環境変数からAPIキーを復号
	ENCRYPTED = os.environ['OPENAI_API_KEY']
	openai.api_key = boto3.client('kms').decrypt(
		CiphertextBlob=b64decode(ENCRYPTED),
		EncryptionContext={'LambdaFunctionName': os.environ['AWS_LAMBDA_FUNCTION_NAME']}
	)['Plaintext'].decode('utf-8')

	# 現在のphaseのチェック
	if phase < 0 or phase > 2:
		return {
			"statusCode": 400,
			"body": "Invalid phase"
		}
	
	if phase == 0:
		#message = post["world"]
		message = json.dumps(post["world"], ensure_ascii=False)
	elif phase == 1:
		#message = post["context1"]
		message = json.dumps(post["context1"], ensure_ascii=False)
	elif phase == 2:
		message = json.dumps(post["context2"], ensure_ascii=False)
		#message = post["context2"]

	# パラメータ用ファイルの読み込み
	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[phase]

	if phase == 0:  # itemとtriviaを羅列
		print("generation item and trivia...")
		with open("prompt_step0.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		output = generationSentence(prompt, message, param)

	elif phase == 1:  # trickの種を作る (common sense -> uncommon sense -> principle + illusion)
		print("generation common sense...")
		with open("prompt_step1.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		step1 = generationSentence(prompt, message, param)

		print("generation uncommon sense...")
		with open("prompt_step2.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		step2 = generationSentence(prompt, step1, param)

		print("generation principle and illusion...")
		with open("prompt_step3.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		output = generationSentence(prompt, step2, param)

	elif phase == 2:  # trickの種から犯人のキャラクタシートを作る
		print("generation character timeline...")
		with open("prompt_step4.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		timeline = generationSentence(prompt, message, param)

		print("generation character info...")
		with open("prompt_step5.txt", mode = "r", encoding="utf-8") as f:
			prompt = f.read()
		chara = json.loads(generationSentence(prompt, timeline, param))

		output = {
			"name": chara["name"],
			"age": chara["age"],
			"profession": chara["profession"],
			"public": chara["public"],
			"private": chara["private"],
			"timeline": timeline,
			"purpose": "犯人であるを隠し通す。"
		}

	output = json.dumps(output, ensure_ascii=False)

	return {
		"statusCode": 200,
		"body": output
	}
