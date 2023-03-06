# Web Programming HW#9

網址：https://wp1111-production-9174.up.railway.app

可以新增、更改、刪除某人某科的考試成績（但查詢不知道為什麼丟上去就失敗了．．．）
有附影片可以佐證

Deployment流程：
1. 完成 Dockfile
2. 更改 ./backend/server.js
3. 新增 deploy 到 ./backend/package.json
4. 新增 build, deploy, install:all, install:prod 到 package.json
5. 更改 ./frontend/src/api.js


備註：
．我在 railway deploy 時在 variable 加上 MONGO_URL 環境變數