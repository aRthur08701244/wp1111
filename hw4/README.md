# Web Programming HW#4

## 完成度：Perfect

## 提醒！
1. 依照作業要求第9點，沒有把 node_modules push到GitHub，但評分者下載下來後要自行把node_modules放入資料夾才會work喔
2. 將Mines Number設定成1，就可以快速測試WIN Modal的功能囉

## 基本要求
1. 讓畫面（HomePage）顯示出來
2. 實作出"Start Game"的button以及其「開始遊戲」的功能
3. 切換介面到遊戲頁面（Board）
4. 刪掉"This is the board Page!"
5. 完成freshBoard
6. 使用map function建構玩Board
7. 加上插旗子的功能（updateFlag），當按下右鍵，會自動判斷以下三種情況
    a. Cell已經被按開（revealed）=> 不能插上旗子
    b. Cell沒有被插旗=> 可以插上旗子
    c. Cell已經被插旗=> 拔掉上面旗子
8. 完成revealCell function:
    a. 當踩到地雷，結束遊戲，跑出Game Over的Modal
    b. 當踩到非雷，繼續遊戲
    c. 當nonMineCount=0，結束遊戲，跑出WIN的Modal

## 進階要求
1. 完成調整難度的功能：
    a. 當按下Difficulty Adjustment按鈕時出現Mines Number以及Board Size，再按一下則隱藏收回
    b. 若不合規則會出現紅色警告字樣，並且調整的參數也會變成紅色，同時Start Button也按不下去
2. 實踐出聰明的可向四周擴展的reveal function
3. 實作出Modal
    a. 當nonMineCount=0，結束遊戲，跑出WIN的Modal
    b. 當踩到地雷，結束遊戲，跑出Game Over的Modal
4. 實作出計時器
