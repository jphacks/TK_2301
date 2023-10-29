
from googletrans import Translator
# pip install googletrans==3.1.0a0
import openai
import requests
from datetime import datetime
import os
# import getpass
import concurrent.futures
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

import shutil
import json

DEBUG = True

def create_empty_directory(path):
    # 既存のディレクトリを削除する（もし存在する場合）
    if os.path.exists(path):
        shutil.rmtree(path)
    # 新しい空のディレクトリを作成する
    os.makedirs(path)

def lambda_handler(event, context):

	# POSTリクエストの解析
	post = event["body"]
	post = json.loads(post)
	item = post["item"]
	
	dir_path = '/tmp'  # 作成または上書きするディレクトリのパス
	#create_empty_directory(dir_path)

	api_key = "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"# getpass.getpass()
	openai.api_key = api_key
	cred = credentials.Certificate('./avocado-test-5e236-firebase-adminsdk-s8b1i-209cd5e1a1.json')
	firebase_admin.initialize_app(cred, {
		'storageBucket': 'avocado-test-5e236.appspot.com'
	})

	image_num = 4# 生成画像の枚数
	image_size = '1024x1024'# '512x512'# '256x256'# '512x512', '1024x1024' #(273,154)# 生成画像のサイズ

	# 画像生成の呪文を作る
	translator = Translator()
	text = item
	# text = "スマートフォン"
	# en_text = "割れた日本酒の酒瓶"
	# text = "メイド長の部屋"
	en_text = translator.translate(text, src="ja", dest="en").text
	description = ""
	# description = "最新型である."
	# description = "わずかに血痕が付着している."
	# description = "洋風で可愛らしい部屋. "
	if description == "":
		en_description = ""
	else:
		en_description = translator.translate(description, src="ja", dest="en").text
	detail = """
	Background color is white. Only objects are generated realistically. Smaller than the frame, leaving more space at the top and bottom.
	"""
	"""detail = 
	Photo-realistic. Composition seen from the entrance.
	"""
	# # illustration-style

	"""
	6/10 detail = Background color is white. Only objects are generated realistically. Margin at the top and bottom.
	1/10 detail = Realistically. Smaller than the frame.
	"""
	if description == "":
		magic_text = f"Image of {en_text}. {detail}"
	else:
		magic_text = f"Image of {en_text}. {en_description} {detail}"
	print("magic text: ", magic_text)

	# 画像生成の呪文を実行する
	response = openai.Image.create(
		prompt = magic_text,
		n = image_num,
		size = image_size,
	)
	image_urls = response['data']

	now = datetime.now().strftime('%Y%m%dT%H%M%S')

	# 並列処理で画像を保存. タイムアウトもつける
	def fetch_image(image_url, timeout):
		if DEBUG:
			print(f"Fetching {image_url}...")
		try:
			response = requests.get(image_url, timeout=timeout)
			response.raise_for_status()  # これによりHTTPエラーが発生すると例外がスローされます
			return response
		except requests.exceptions.RequestException as e:
			print(f"An error occurred: {e}")
			return None

	pathes = []
	with concurrent.futures.ThreadPoolExecutor(max_workers=image_num) as executor:
		futures = [executor.submit(fetch_image, image_urls[i].url, 10) for i in range(image_num)]
		for i, future in enumerate(futures):
			response = future.result()
			if response is not None:  # 応答が None でないことを確認
				# en_textの空欄を_に置き換える
				img_title = en_text.replace(" ", "_")
				path = f"{dir_path}/{now}_{img_title}_image{i}.png"
				pathes.append(path)
				with open(path, "wb") as f:
					f.write(response.content)

	def upload_image_to_firebase(file_path):
		bucket = storage.bucket()
		blob = bucket.blob(file_path)
		blob.upload_from_filename(file_path)
		print(f'Image {file_path} uploaded to {blob.public_url}')

	for path in pathes:
		upload_image_to_firebase(path)
	
	print(path)
	output = {"url": path}
	output = json.dumps(output, ensure_ascii=False)
	print(output)
	
	return {
		"statusCode": 200,
		"body": output
	}
