# Web Programming HW#5

## 完成度：Perfect（拜託同學了 之前耍笨都沒拿到perfect．．． 我這次進階要求做了4個 還請同學手下留情）

請先在frontend以及backend目錄下yarn install!!!
請使用自己的DB，放在backend/.env.defaults

## 基本要求（0的版本）

若要檢查基本要求的版本，請將 ./frontend/src/Containers/App.js 裡的 import Body from './Body'; 改成 import Body from './Body0'; 以及 ./backend/src/routes/index.js 裡的 import ScoreCardRouter from "./scoreCard"; 改成 import ScoreCardRouter from "./scoreCard0";

1. Clear會把DB以及介面清空，並印出Database cleared（第一以及第四點）
2. Add會將資料傳入DB，且印出Updating or Adding
3. Query回傳並印出搜尋結果

## 進階要求（什麼都不用改，完成yarn install以及加入.env.defaults後就可以直接yarn start yarn server檢查了）

1. Add與Query分成兩個tabs
2. Query以table的方式呈現
3. Add會順便Query
4. 印出的結果可依照欄位排序