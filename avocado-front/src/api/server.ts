class AIServer {
  async fetch(endpoint: string, data: any) {
    const res = await fetch(`http://163.43.208.229:8080/${endpoint}`, {
      method: 'POST', // HTTP-Methodを指定する
      body: JSON.stringify(data), // リクエストボディーにフォームデータを設定
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonData = await res.json();
    console.log(jsonData);

    return jsonData;
  }
}

const AIserverInstance: AIServer = new AIServer();

export default AIserverInstance;
