import json
import os
import openai
from typing import Union
from pydantic import BaseModel
from fastapi import FastAPI

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

class reqBodyLegacy(BaseModel):
	phase: int
	context: str

class reqBody(BaseModel):
	user_input: str

app = FastAPI()

@app.get("/")
def read_root():
	return {"Hello": "World"}

"""
本番用
"""
# hackdayまでの仕様
@app.post("/prod/scenario-generator")
def create_scenario_test(reqBody: reqBodyLegacy):
	phase = reqBody.phase

	# 現在のphaseのチェック
	if phase < 0 or phase > 2: return {"res": "Invalid phase"}

	message = reqBody.context
	if phase == 0:
		output = {"world": "testWorld", "item": ["testItem1", "testItem2"], "trivia": ["testTrivia1", "testTrivia2"]}
	elif phase == 1:
		output = {"world":"testWorld","item":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}]}
	elif phase == 2: 
		output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}

	return output

# これからの仕様
@app.post("/prod/item-and-trivia")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"world": "testWorld", "item": ["testItem1", "testItem2"], "trivia": ["testTrivia1", "testTrivia2"]}
	return output

@app.post("/prod/trick")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"world":"testWorld","item":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}]}
	return output

@app.post("/prod/criminal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output

@app.post("/prod/normal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output

"""
テスト用
生成はせず、仮のレスポンスを返す
"""
# hackdayまでの仕様
@app.post("/test/scenario-generator")
def create_scenario_test(reqBody: reqBodyLegacy):
	phase = reqBody.phase

	# 現在のphaseのチェック
	if phase < 0 or phase > 2: return {"res": "Invalid phase"}

	message = reqBody.context
	if phase == 0:
		output = {"world": "testWorld", "item": ["testItem1", "testItem2"], "trivia": ["testTrivia1", "testTrivia2"]}
	elif phase == 1:
		output = {"world":"testWorld","item":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}]}
	elif phase == 2: 
		output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}

	return output

# これからの仕様
@app.post("/test/item-and-trivia")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"world": "testWorld", "item": ["testItem1", "testItem2"], "trivia": ["testTrivia1", "testTrivia2"]}
	return output

@app.post("/test/trick")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"world":"testWorld","item":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}],"trivia":[{"name":"testName","uncommonSense":"testUncommonSense","principle":"testPrinciple","illusion":"testIllusion"}]}
	return output

@app.post("/test/criminal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output

@app.post("/test/normal-character")
def create_scenario_test(reqBody: reqBody):
	message = reqBody.user_input
	print("user input:\n" + message)
	output = {"name": "testName","age": "testAge","profession": "testProfession","public": "testPublic","private": "testPrivate","timeline": [{"num": 1, "text": "testText1"}, {"num": 2, "text": "testText2"}],"purpose": "testPurpose"}
	return output