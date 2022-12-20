
> 專案使用網頁切版班 Gulp 範本。
## 專案主題 : Engineer(); 程式學習資源網
### 目前完成功能包含
- 登入註冊、修改個人資料
- 資源列表頁篩選排序
- 資源收藏、可我的資源頁瀏覽收藏清單、取消收藏
- 資源留言評價

### 注意事項:
- 目前API資料使用 render ( https://json-server-cyh3.onrender.com )，若連線有問題或無正確資料連線，畫面會顯示 Loading
- 如有上述情況，仍想要瀏覽一般切版畫面，使用Chrome右鍵檢查，將元素中的body內以下幾下刪除即可
    - ```<body>``` 中的 style="overflow-y:hidden"
    - ```<div class="loadingBG"></div>``` 整個loadingBG div刪除
    - ```<div class="wrapperLoading">...</div>```刪除整個 wrapperLoading div
- 可使用此帳號密碼瀏覽會員頁或另行註冊(提醒：註冊資料僅為暫存)   
    - dora.lin@gmail.com  /  123123
- 如有其他問題想詢問歡迎聯繫 aureate16@gmail.com
