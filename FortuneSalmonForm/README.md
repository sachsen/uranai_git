# FortuneSalmonForm

## ローカルのファイルシステムで実行する場合
クロスドメイン制約に引っかかるので以下のように解決する

### Macの場合

```
open /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir
```

### Windowsの場合

```
chrome.exe --disable-web-security --user-data-dir
```

## URLを適宜調整
パラメータでHOSTとPORTを設定(デフォルトはhttp://localhost:8080)

例
```
index.html?HOST=192.168.11.2&PORT=8080
```

## サーバから返す場合
準備
```
npm install
```
サーバ起動
```
npm start
```
