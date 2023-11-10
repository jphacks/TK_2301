import json
import os
import openai
from openai import OpenAI
from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI

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
	return response["choices"][0]["message"]["content"]

app = FastAPI()
client = OpenAI(api_key = os.environ["API_KEY"])

# そもそもの通信ができているかのテスト用
@app.get("/")
def read_root():
	return {"Hello": "World"}

"""
本番用
"""
@app.post("/prod/item-and-trivia")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input

	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[0]

	print("generation item and trivia...")
	with open("prompt_step0.txt", mode = "r", encoding="utf-8") as f:
		prompt = f.read()
	output = json.loads(generationSentence(prompt, message, param))
	return output

@app.post("/prod/trick")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	
	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[1]

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
	output = json.loads(generationSentence(prompt, step2, param))

	return output

@app.post("/prod/criminal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	
	with open("./parameters.json", mode = "r") as f:
		json_parameters = f.read()
	parameters = json.loads(json_parameters)
	param = parameters[2]

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
		"public_info": chara["public_info"],
		"private_info": chara["private_info"],
		"timeline": timeline,
		"purpose": "犯人であるを隠し通す。",
		"item": [
			{
				"name": "testName1",
				"image": ["testURL1", "testURL2", "testURL3", "testURL4"]
			},
			{
				"name": "testName1",
				"image": ["testURL1", "testURL2", "testURL3", "testURL4"]
			}
		]
	}

	return output

@app.post("/prod/normal-character")
def create_scenario_test(reqBody: reqBody):
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
	output = {"world":"testWorld","item":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}]}
	return output

@app.post("/test/criminal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name":"testName","age":"testAge","profession":"testProfession","public_info":"testpublic_info","private_info":"testprivate_info","timeline":[{"num":1,"text":"testText1"},{"num":2,"text":"testText2"}],"purpose":"testPurpose","item":[{"name":"testName1","image":["testURL1","testURL2","testURL3","testURL4"]},{"name":"testName2","image":["testURL1","testURL2","testURL3","testURL4"]}]}
	return output

@app.post("/test/normal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	message = json.loads(message)
	print(json.dumps(message, indent=2, ensure_ascii=False))
	output = {"name": "testName","age": "testAge","profession": "testProfession","public_info": "testpublic_info","private_info": "testprivate_info","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output