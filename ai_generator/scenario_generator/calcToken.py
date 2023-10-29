# 請求金額を計算する（ドル）
def calcBilling(response, model = "gpt-3.5-turbo"):
	if model == "gpt-4":
		return "{:.10g}".format(0.03 * 0.001 * response["usage"]["prompt_tokens"] + 0.06 * 0.001 * response["usage"]["completion_tokens"])
	elif model == "gpt-3.5-turbo":
		return "{:.10g}".format(0.0015 * 0.001 * response["usage"]["prompt_tokens"] + 0.002 * 0.001 * response["usage"]["completion_tokens"])
	else:
		print("Error: invalid model name")
		return -1