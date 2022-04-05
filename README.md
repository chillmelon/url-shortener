# Url Shortener
[demo](http://url.amkongchiau.com/)
## 啟動方式

### Clone 專案
```
git clone https://github.com/chillmelon/url-shortener.git
cd url-shortener
```

### a. Docker
1. Install Docker and Docker Compose
	https://docs.docker.com/engine/install/

1. Build and run
	```
	cp .env.example .env # make some adjustment if needed
	docker-compose up --build
	```

( 預設跑 80 port，如果需要調整，請編輯 docker-compose.yaml )

### b. Kubernetes
1. 安裝 helm
	https://helm.sh/docs/intro/install/
1. 用 helm 啟動 mariadb-galera
	```
	helm install mariadb ./kubernetes/mariadb-galera/
	```
1. 編輯 ./kubernetes/node/deployment.yaml，主要是 baseUrl 要設定
1. 啟動 node.js API 服務
	```
	kubectl apply -f ./kubernetes/node
	```

## 思路
- 這個專案是用個人比較熟悉的 node.js (Express.js) 做開發，搭配 MariaDB，部署在 k8s cluster
- 主要功能如下
	- 收到 POST /api/v1/urls
		1. 檢查 body :
			- url 是否真實存在 ( 完 url 需包含 protocol, domain, path )
			- expiration_date 是否符合 ISO8601 格式
		2. 生成一個 12 位的隨機 id
		3. 將 id, url, expireAt 存入 DB
	- 收到 GET /{id}
		1. 檢查 params :
			- id 是否為 12 位
		2. 向 DB 查詢符合 id 且未過期的 record
		3. 重新導向查到的 url

## 3rd Party Library
### id 相關
使用第三方的套件 nanoid，利用自訂的 alphbat 產生 12 碼的 id，在每秒 100 次請求的情況下，要大約 7 年才會有 1% 的機率生成 1 個重複的 id。

在 cluster 中多服務的情況下，沒有辦法保證不發生 collision，所以多加了自訂的 seed-based 隨機演算法，這邊導入第三方的套件 seedrandom，每個服務透過環境變數傳入 K8s 的 pod name 作為 seed，來確保 cluster 中的多個服務不會發出重複 id，日後要 scale up 的時候也不用再手動設定 seed。

就算這樣，還是有一點點點的可能會發生 id collision，所以在存入 DB 的時候，如果遇到 Duplicate，就重新生成一組 id，最多做 3 次。

### 架構相關
Url Service 的部分，透過 Load Balancer 將服務平均導向 3 個 pods，以防塞車。

DB 的部分，使用 bitnami 維護的 mariadb-galera helm chart 搭配自訂的參數做使用，3 個 master node，可同時讀寫，在一個 node 失效時，另外兩個 node 可以繼續作業，防止 single point failure，缺點是新增 node 的時候速度偏慢，還有寫入時稍慢。

## Future Work
加入 LRU 的 Memcached，新增或取用 url 的時候都新增到 cache 裡，很久沒用到的自然會被淘汰。

![image](https://user-images.githubusercontent.com/43177690/161772381-317421f4-c918-4d3f-9bee-c82904457273.png)
