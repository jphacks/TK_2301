import json
import os
import time
import openai
from openai import OpenAI
from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI

# 並列化
import concurrent.futures

class reqBody(BaseModel):
	user_input: str

def generationSentence(prompt, user_input, param):
	message_list = [{"role": "system", "content": "あなたはマーダーミステリーのシナリオ作家です。\n" + prompt}]
	message_list.append({"role": "user", "content": str(user_input)})
	response = client.chat.completions.create(
		messages = message_list,
		model = param["model"],
		max_tokens = param["max_tokens"],
		temperature = param["temperature"],
		stop = param["stop"],
		response_format = {"type": "json_object"}  # 必ずjsonとして出力してくれる新機能！
	)
	return response.choices[0].message.content

# 2つの異なるpromptを並列生成, 2つのresponseを返す
def parallel_generate(item_prompt, trivium_prompt, item_input, trivium_input, param):
	start = time.time()
	with concurrent.futures.ThreadPoolExecutor() as executor:
		future_item = executor.submit(generationSentence, item_prompt, item_input, param)
		future_trivium = executor.submit(generationSentence, trivium_prompt, trivium_input, param)
		response_item = future_item.result()
		response_trivium = future_trivium.result()
	end = time.time()
	print(f"elapsed time: {end - start}")

	return response_item, response_trivium

app = FastAPI()
client = OpenAI(api_key = os.environ["OPENAI_API_KEY"])

# そもそもの通信ができているかのテスト用
@app.get("/")
def read_root():
	return {"Hello": "World"}

"""
本番用
"""
@app.post("/prod/item-and-trivia")
def create_scenario(reqBody: reqBody):
	
	# ユーザ入力をitemとtriviaに分ける
	message = reqBody.user_input
	item_input = message
	trivium_input = message

	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[0]

	print("generation item and trivia...")
	item_prompt_filename = "./prompt/prompt_step0_item.txt"
	with open(item_prompt_filename, mode = "r", encoding="utf-8") as f:
		item_prompt = f.read()
	trivium_prompt_filename = "./prompt/prompt_step0_trivium.txt"
	with open( trivium_prompt_filename, mode = "r", encoding="utf-8") as f:
		trivium_prompt = f.read()

	# 並列に生成
	response_item, response_trivium = parallel_generate(item_prompt, trivium_prompt, item_input, trivium_input, param)
	response_item = json.loads(response_item)
	response_trivium = json.loads(response_trivium)

	response = {"world": response_item["world"], "item": response_item["items"], "trivia": response_trivium["trivia"]}
	#response = json.loads(response)
	return response

@app.post("/prod/trick")
def create_scenario(reqBody: reqBody):
	
	# ユーザ入力をitemとtriviaに分ける
	message = reqBody.user_input
	message = json.loads(message)
	item_input = {"world": message["world"], "items": message["items"]}
	trivium_input = {"world": message["world"], "trivia": message["trivia"]}

	# パラメータの読み込み	
	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[1]

	# 常識(commonSense)の生成
	print("generation common sense...")
	item_prompt_filename = "./prompt/prompt_step1_item.txt"
	with open(item_prompt_filename, mode = "r", encoding="utf-8") as f:
		item_prompt = f.read()
	trivium_prompt_filename = "./prompt/prompt_step1_trivium.txt"
	with open( trivium_prompt_filename, mode = "r", encoding="utf-8") as f:
		trivium_prompt = f.read()
	
	if len(message["items"]) == 0:
		step1_trivium = generationSentence(trivium_prompt, trivium_input, param)
	elif len(message["trivia"]) == 0:
		step1_item = generationSentence(item_prompt, item_input, param)
	else:
		step1_item, step1_trivium = parallel_generate(item_prompt, trivium_prompt, item_input, trivium_input, param)

	# 反常識(denialSense)の生成
	print("generation uncommon sense...")
	item_prompt_filename = "./prompt/prompt_step2_item.txt"
	with open(item_prompt_filename, mode = "r", encoding="utf-8") as f:
		item_prompt = f.read()
	trivium_prompt_filename = "./prompt/prompt_step2_trivium.txt"
	with open( trivium_prompt_filename, mode = "r", encoding="utf-8") as f:
		trivium_prompt = f.read()
	
	if len(message["items"]) == 0:
		step2_trivium = generationSentence(trivium_prompt, step1_trivium, param)
	elif len(message["trivia"]) == 0:
		step2_item = generationSentence(item_prompt, step1_item, param)
	else:
		step2_item, step2_trivium = parallel_generate(item_prompt, trivium_prompt, step1_item, step1_trivium, param)

	# トリックの種の生成
	print("generation principle and illusion...")
	item_prompt_filename = "./prompt/prompt_step3_item.txt"
	with open(item_prompt_filename, mode = "r", encoding="utf-8") as f:
		item_prompt = f.read()
	trivium_prompt_filename = "./prompt/prompt_step3_trivium.txt"
	with open( trivium_prompt_filename, mode = "r", encoding="utf-8") as f:
		trivium_prompt = f.read()
	if len(message["items"]) == 0:
		step3_trivium = generationSentence(trivium_prompt, step2_trivium, param)
	elif len(message["trivia"]) == 0:
		step3_item = generationSentence(item_prompt, step2_item, param)
	else:
		step3_item, step3_trivium = parallel_generate(item_prompt, trivium_prompt, step2_item, step2_trivium, param)

	# レスポンスの生成

	if len(message["items"]) == 0:
		step3_trivium = json.loads(step3_trivium)
		response = {"world": message["world"], "item": [], "trivia": step3_trivium["trivia"]}
	elif len(message["trivia"]) == 0:
		step3_item = json.loads(step3_item)
		response = {"world": message["world"], "item": step3_item["items"], "trivia":[]}
	else:
		step3_item = json.loads(step3_item)
		step3_trivium = json.loads(step3_trivium)
		response = {"world": message["world"], "item": step3_item["items"], "trivia": step3_trivium["trivia"]}

	return response

@app.post("/prod/criminal-character")
def create_scenario(reqBody: reqBody):
	message = reqBody.user_input
	
	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[2]

	print("generation character timeline...")
	with open("./prompt/prompt_step4.txt", mode = "r", encoding="utf-8") as f:
		prompt = f.read()
	timeline = generationSentence(prompt, message, param)

	print("generation character info...")
	with open("./prompt/prompt_step5.txt", mode = "r", encoding="utf-8") as f:
		prompt = f.read()
	chara = json.loads(generationSentence(prompt, timeline, param))

	timeline = json.loads(timeline)
	output = {
		"name": chara["name"],
		"age": chara["age"],
		"profession": chara["profession"],
		"public_info": chara["public_info"],
		"private_info": chara["private_info"],
		"timeline": timeline,
		"purpose": "犯人であるを隠し通す。"
	}
	return output

@app.post("/prod/normal-character")
def create_scenario(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name": "testName","age": "testAge","profession": "testProfession","public_info": "testpublic_info","private_info": "testprivate_info","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output

"""
テスト用
生成はせず、仮のレスポンスを返す
"""
@app.post("/test/item-and-trivia")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"world": "testWorld", "item": ["testItem1", "testItem2"], "trivia": ["testTrivia1", "testTrivia2"]}
	return output

@app.post("/test/trick")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"world":"testWorld","item":[{"name":"testName","denial":"testDenial","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","denial":"testDenial","principle":"testPrinciple","illusion":"testIllusion"}]}
	return output

@app.post("/test/criminal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name":"testName","age":"testAge","profession":"testProfession","public_info":"testpublic_info","private_info":"testprivate_info","timeline":[{"num":1,"text":"testText1"},{"num":2,"text":"testText2"}],"purpose":"testPurpose"}
	return output

@app.post("/test/normal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name": "testName","age": "testAge","profession": "testProfession","public_info": "testpublic_info","private_info": "testprivate_info","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output

@app.post("/test/image/item")
def create_image_test(reqBody: reqBody):
	message = reqBody.user_input
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name": message,"image":["http://XXX/item/XXX1.png","http://XXX/item/XXX2.png","http://XXX/item/XXX3.png","http://XXX/item/XXX4.png"]}
	return output

@app.get("/test/env")
def read_env():
	test_env = os.environ["TEST_ENV"]
	return {"TEST_ENV": test_env}