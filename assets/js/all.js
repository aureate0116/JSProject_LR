/*****************nab tab***************/
//hover 切換
// const navItem = document.querySelectorAll(".goodRate .nav-link");
// const tabContent = document.querySelectorAll(".goodRate .tab-pane");
// console.log(navItem);
// console.log(tabContent);
// navItem.forEach((value,index)=>{
//   value.addEventListener('mouseover',(e)=>{
//     console.log("tt",e.target.getAttribute("id"));
//     let labelledby = tabContent[index].getAttribute("aria-labelledby");
//     //console.log(tabContent[index].classList);
//     if(e.target.getAttribute("id") == labelledby ){
//       //console.log("yes");
//       tabContent[index].classList.add("show");
//       console.log(tabContent[index].classList);
//     }
//   })
// })
"use strict";
"use strict";

//1. 頁面初始化
function initIndex() {
  getResourcesForIndex();
}

initIndex(); //好評推薦

var goodRate1 = document.querySelector('#goodRate1 > div.row');
var goodRate2 = document.querySelector('#goodRate2 > div.row');
var goodRate3 = document.querySelector('#goodRate3 > div.row');
var goodRate1Tab = document.querySelector('#goodRate1-tab');
var goodRate2Tab = document.querySelector('#goodRate2-tab');
var goodRate3Tab = document.querySelector('#goodRate3-tab'); //最新免費資源

var resourceType1 = document.querySelector('#resourceType1 > div.row');
var resourceType2 = document.querySelector('#resourceType2 > div.row');
var resourceType3 = document.querySelector('#resourceType3 > div.row');
var resource1Tab = document.querySelector('#resource1-tab');
var resource2Tab = document.querySelector('#resource2-tab');
var resource3Tab = document.querySelector('#resource3-tab');
console.log(resource1Tab);
var resourcesData = [];
var commentsData = []; //取得資源資料

function getResourcesForIndex() {
  axios.get('./json/db.json').then(function (res) {
    resourcesData = res.data.resources;
    commentsData = res.data.comments;
    renderGoodRateList();
    renderNewFreeList();
  })["catch"](function (error) {
    console.log(error);
  });
} //渲染好評推薦資料


function renderGoodRateList() {
  var resultScore = getAverageScore();
  var newResultScoreOjb = combineCommentStar(resultScore); //newResultScore

  var itemNum1 = 0;
  var itemNum2 = 0;
  var itemNum3 = 0;
  var renderMaxNum = 6;
  var tabJS = "";
  var tabHtml = "";
  var tabPython = "";
  resourcesData.forEach(function (item, index) {
    switch (item.topics) {
      case "JavaScript":
        if (itemNum1 < renderMaxNum) {
          tabJS += combineResouorceItemType1(item, index, resultScore, newResultScoreOjb, resourceIdObj);
          itemNum1 += 1;
        }

        break;

      case "HTML/CSS":
        if (itemNum2 < renderMaxNum) {
          tabHtml += combineResouorceItemType1(item, index, resultScore, newResultScoreOjb, resourceIdObj);
          itemNum2 += 1;
        }

        break;

      case "Python":
        if (itemNum3 < renderMaxNum) {
          tabPython += combineResouorceItemType1(item, index, resultScore, newResultScoreOjb, resourceIdObj);
          itemNum3 += 1;
        }

        break;
    } //itemNum +=1;

  });

  if (goodRate1 !== null) {
    if (tabJS == "") {
      goodRate1Tab.setAttribute("class", "d-none");
    }

    goodRate1.innerHTML = tabJS;
  }

  if (goodRate2 !== null) {
    if (tabHtml == "") {
      goodRate2Tab.setAttribute("class", "d-none");
    }

    goodRate2.innerHTML = tabHtml;
  }

  if (goodRate3 !== null) {
    if (tabPython == "") {
      goodRate3Tab.setAttribute("class", "d-none");
    }

    goodRate3.innerHTML = tabPython;
  }
} //組單一資源項目html - type 1


function combineResouorceItemType1(item, index, resultScore, newResultScoreOjb, resourceIdObj) {
  if (item.imgUrl === "") {
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (resultScore["".concat(index + 1)] === undefined || newResultScoreOjb[item.id] === undefined || resourceIdObj["".concat(index + 1)] === undefined) {
    return "\n    <div class=\"col-md-6 col-lg-4\">\n    <div class=\"d-flex p-2 align-items-center\">\n        <img src=\"".concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\">\n        <div class=\"p-2\">\n            <h4 class=\"ellipsis\"><a href=\"").concat(item.url, "\" target=\"_blank\"> ").concat(item.title, "</a></h4>\n            <div class=\"d-flex justify-content-between align-items-center\">\n            \u5C1A\u7121\u8A55\u50F9\n            </div>\n        </div>\n    </div>\n    </div>\n    ");
  } else {
    return "\n    <div class=\"col-md-6 col-lg-4\">\n    <div class=\"d-flex p-2 align-items-center\">\n        <img src=\"".concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\">\n        <div class=\"p-2\">\n            <h4 class=\"ellipsis\"><a href=\"").concat(item.url, "\" target=\"_blank\"> ").concat(item.title, "</a></h4>\n            <div class=\"d-flex justify-content-between align-items-center\">\n                <span class=\"fs-6 fw-bold\"> ").concat(resultScore["".concat(index + 1)], "</span>\n                <ul class=\"d-flex align-items-center lh-1\">\n                ").concat(newResultScoreOjb[item.id], "\n                </ul>                                \n                <span class=\"fs-7\">(").concat(resourceIdObj["".concat(index + 1)], ")</span>\n            </div>\n        </div>\n    </div>\n    </div>");
  }
} //渲染最新免費資源


function renderNewFreeList() {
  var resultScore = getAverageScore();
  var newResultScoreOjb = combineCommentStar(resultScore); //newResultScore

  var tabOnline = "";
  var tabOffline = "";
  var tabArticle = "";
  resourcesData.forEach(function (item, index) {
    if (item.classify.price === "免費") {
      if (item.classify.type === "線上課程") {
        tabOnline += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
      }

      if (item.classify.type === "實體課程") {
        tabOffline += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
      }

      if (item.classify.type === "文章") {
        tabArticle += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
      }
    }
  });

  if (resourceType1 !== null) {
    resourceType1.innerHTML = tabOnline;

    if (tabOnline == "") {
      resource1Tab.setAttribute("class", "d-none");
    }
  }

  if (resourceType2 !== null) {
    resourceType2.innerHTML = tabOffline;

    if (tabOffline == "") {
      resource2Tab.setAttribute("class", "d-none");
    }
  }

  if (resourceType3 !== null) {
    resourceType3.innerHTML = tabArticle;

    if (tabArticle == "") {
      resource3Tab.setAttribute("class", "d-none");
    }
  }
}
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//1. 頁面初始化
function initResourceList() {
  getResourcesForResources();
}

initResourceList();
/*****************入門推薦 ***************/

var foundation1Basic = document.querySelector('#foundation1Basic > div.row');
var foundation2Free = document.querySelector('#foundation2Free > div.row');
var foundation3CN = document.querySelector('#foundation3CN > div.row');
var resourcesData = [];
var commentsData = []; //2. 取得資料

function getResourcesForResources() {
  axios.get('./json/db.json').then(function (res) {
    resourcesData = res.data.resources;
    commentsData = res.data.comments;
    renderFoundationRecommond();
    renderFilterResultList(); //getAverageScore();
    //filterAndSort();
  })["catch"](function (error) {
    console.log(error);
  });
} //3. 渲染入門推薦資料


function renderFoundationRecommond() {
  var resultScore = getAverageScore();
  var newResultScoreOjb = combineCommentStar(resultScore); //newResultScore

  var itemNum1 = 0;
  var itemNum2 = 0;
  var itemNum3 = 0;
  var renderMaxNum = 5; //組各tab render HTML

  var basicStr = "";
  var freeStr = "";
  var cnStr = "";
  resourcesData.forEach(function (item, index) {
    if (item.classify.level === "初階") {
      if (itemNum1 < renderMaxNum) {
        basicStr += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
        itemNum1 += 1;
      }
    }

    if (item.classify.price === "免費") {
      if (itemNum2 < renderMaxNum) {
        freeStr += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
        itemNum2 += 1;
      }
    }

    item.classify.lang.forEach(function (langItem) {
      if (langItem === "繁體中文") {
        if (itemNum3 < renderMaxNum) {
          cnStr += combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj);
          itemNum3 += 1;
        }
      }
    });
  });

  if (foundation1Basic !== null) {
    foundation1Basic.innerHTML = basicStr;
  }

  if (foundation2Free !== null) {
    foundation2Free.innerHTML = freeStr;
  }

  if (foundation3CN !== null) {
    foundation3CN.innerHTML = cnStr;
  } // foundation1Basic.innerHTML = basicStr;
  // foundation2Free.innerHTML = freeStr;
  // foundation3CN.innerHTML = cnStr;

} //計算分數


var scoreTotal = {}; //每筆資源評價 總分

var resourceIdObj = {}; //每筆資源評價 筆數

var resultScore = {}; //每筆資源 平均分數(星星數)

function getAverageScore() {
  commentsData.forEach(function (item) {
    if (resourceIdObj[item.resourceId] === undefined) {
      resourceIdObj[item.resourceId] = 1;
      scoreTotal[item.resourceId] = item.score;
    } else {
      resourceIdObj[item.resourceId] += 1;
      scoreTotal[item.resourceId] += item.score;
    }

    resultScore[item.resourceId] = (scoreTotal[item.resourceId] / resourceIdObj[item.resourceId]).toFixed(1);
  });
  return resultScore; //console.log(resultScore);  //1: '4.0', 2: '3.3', 3: '4.5', 4: '2.8'}
} //4. 組星星字串


function combineCommentStar(resultScore) {
  //評論分數+星星+筆數 HTML
  var newResultScore = _objectSpread({}, resultScore);

  var resourceIdArr = Object.keys(newResultScore); //['1, '2, '3'] 

  var scoreArr = Object.values(newResultScore); //['4.0', '3.3', '4.5' ,'2.8'] 

  scoreArr.forEach(function (item, index) {
    var starStr = ""; //星星HTML String
    //星星數

    for (var i = 1; i <= item[0]; i++) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>";
      newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
    } //半顆星星+空星星  


    if (item[2] <= 2) {
      for (var _i = 1; _i <= 5 - item[0]; _i++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li> ";
        newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
      }
    } else if (item[2] >= 3 && item[2] <= 7) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_half</span></li>";

      for (var _i2 = 1; _i2 <= 5 - item[0] - 1; _i2++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
      }

      newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
    } else if (item[2] >= 8) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li";

      for (var _i3 = 1; _i3 <= 5 - item[0] - 1; _i3++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
        newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
      }
    }
  });
  return newResultScore;
} //5. 入門推薦組單一資源項目html


function combineResouorceItem(item, index, resultScore, newResultScoreOjb, resourceIdObj) {
  if (item.imgUrl === "") {
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (resultScore["".concat(index + 1)] === undefined || newResultScoreOjb[item.id] === undefined || resourceIdObj["".concat(index + 1)] === undefined) {
    return "\n    <div class=\"col-lg-2 col-md-4 col-6\">\n    <div>\n        <p class=\"text-center\">\n            <a href=\"./resource.html\" target=\"_blank\">\n            <img src=\"".concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></p>\n        <div class=\"p-2\">\n            <h4 class=\"fs-7 ellipsis\"><a href=\"").concat(item.url, "\" target=\"_blank\"> ").concat(item.title, "</a></h4>\n            <div class=\"d-flex flex-wrap justify-content-between align-items-center\">                             \n                <span class=\"fs-8\"> \u5C1A\u7121\u8A55\u50F9 </span>\n            </div>\n  \n        </div>\n    </div>\n    </div>\n    ");
  } else {
    return "\n      <div class=\"col-lg-2 col-md-4 col-6\">\n      <div>\n          <p class=\"text-center\">\n              <a href=\"./resource.html\" target=\"_blank\">\n              <img src=\"".concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></p>\n          <div class=\"p-2\">\n              <h4 class=\"fs-7 ellipsis\"><a href=\"").concat(item.url, "\" target=\"_blank\"> ").concat(item.title, "</a></h4>\n\n              <div class=\"d-flex flex-wrap justify-content-between align-items-center\">\n                  <span class=\"fs-7 fw-bold me-lg-2\"> ").concat(resultScore["".concat(index + 1)], "</span>\n                  <ul class=\"d-flex align-items-center lh-1 me-lg-2\">\n                  ").concat(newResultScoreOjb[item.id], "\n                  </ul>                                \n                  <span class=\"fs-8\">(").concat(resourceIdObj["".concat(index + 1)], ")</span>\n              </div>\n\n          </div>\n      </div>\n      </div>\n      ");
  }
} //判斷圖片處理
//圖片顯示比例問題 

/***************** 相關主題 ***************/

/***************** 資源篩選 ***************/


var resourceItem = document.querySelector('.resourceItem'); // const filter = document.querySelector('.filter');

var filterItemInput = document.querySelectorAll('.filterItem > input'); // final 渲染清單

var newResourcesRenderList = getRenderList(resourcesData); // let newResourcesRenderList = [];
//1. checked 監聽 : 取得 checked 清單的關鍵字 + render

/************************暫時新增************************************* */

var tempRenderList = [];
var groupNameArr = []; // ['type', 'type', 'level']
//let checkedKeyWords =[]; //
//比對resourcesData原始資料, 符合條件的加入 tempRenderList 

function addToTempRenderList(filterKeyword, groupName) {
  resourcesData.forEach(function (resItem, resIndex) {
    if (resItem.classify.lang.langth === 1) {
      if (filterKeyword === resItem.classify[groupName] || filterKeyword === resItem.classify.lang[0]) {
        tempRenderList.push(resItem);
        groupNameArr.push(groupName); //checkedKeyWords.push(filterKeyword);
      }
    } else {
      resItem.classify.lang.forEach(function (langItem) {
        if (filterKeyword === resItem.classify[groupName] || filterKeyword === langItem) {
          tempRenderList.push(resItem);
          groupNameArr.push(groupName); // checkedKeyWords.push(filterKeyword);
        }
      });
    } //每次加完先去除重複項目


    var set = new Set();
    tempRenderList = tempRenderList.filter(function (item) {
      return !set.has(item.id) ? set.add(item.id) : false;
    });
    groupNameArr = groupNameArr.filter(function (item) {
      return !set.has(item) ? set.add(item) : false;
    });
  });
  console.log("tempRenderList");
  console.log(tempRenderList);
  console.log("groupNameArr");
  console.log(groupNameArr);
}

function removeFromTempRenderList(filterKeyword, groupName) {
  //1. 同 groupName 情況
  tempRenderList.forEach(function (resItem, resIndex) {
    // console.log("groupName",groupName);  //lang
    // console.log("filterKeyword",filterKeyword); //繁體中文
    if (groupName === "lang") {
      // console.log(resItem.classify.lang.length); 
      if (resItem.classify.lang.length === 1) {
        if (filterKeyword === resItem.classify.lang[0]) {
          tempRenderList.splice(resIndex, 1);
        }
      } else {
        //如果 lang 有多筆
        resItem.classify.lang.forEach(function (langItem) {
          if (filterKeyword === langItem) {
            tempRenderList.splice(resIndex, 1);
          } // tempRenderList = tempRenderList.filter(item=>{
          //   return  langItem != filterKeyword;
          // })

        }); // tempRenderList = tempRenderList.filter(item=>{
        //     item.classify.lang.forEach(langItem=>{
        //       return  langItem != filterKeyword;
        //     })
        // })
      }
    } else if (filterKeyword === resItem.classify[groupName]) {
      tempRenderList = tempRenderList.filter(function (item) {
        return item.classify[groupName] != filterKeyword;
      });
    } // if(groupName === "lang"){
    //     if(resItem.classify.lang.length===1){
    //       tempRenderList = tempRenderList.filter(item=>{
    //         return item.classify.lang[0] != filterKeyword;
    //       })
    //     }
    //     // else{
    //     //   resItem.classify.lang.forEach(langItem=>{
    //     //     tempRenderList = tempRenderList.filter(item=>{
    //     //       return langItem != filterKeyword;
    //     //     })
    //     //   })
    //     // }
    // }else{
    // }
    // if(resItem.classify.lang.langth===1){
    //   if(filterKeyword === resItem.classify.type ||
    //     filterKeyword === resItem.classify.level ||
    //     filterKeyword === resItem.classify.price ||  
    //     filterKeyword === resItem.classify.lang[0] ){
    //       tempRenderList.splice(resItem,1);
    //       groupNameArr.splice(groupName,1); 
    //   }
    // }
    // else{
    //   resItem.classify.lang.forEach(langItem=>{
    //      if(filterKeyword === resItem.classify.type ||
    //        filterKeyword === resItem.classify.level ||
    //        filterKeyword === resItem.classify.price ||  
    //        filterKeyword === langItem ){
    //          tempRenderList.splice(resItem,1);
    //          groupNameArr.splice(groupName,1); 
    //      }
    //    })   
    // }
    // console.log("tempRenderList");
    // console.log(tempRenderList);
    // console.log("groupNameArr");
    // console.log(groupNameArr);

  });
}

filterItemInput.forEach(function (inputItem, index) {
  inputItem.addEventListener("change", function (e) {
    var filterKeyword = e.target.getAttribute("name");
    var groupName = e.target.getAttribute("data-group");
    console.log(filterKeyword, groupName);

    if (e.target.checked) {
      //1. 檢查是否為第一筆資料 (即第一個checked 項目)
      if (tempRenderList.length === 0 && groupNameArr.length === 0) {
        //比對resourcesData原始資料, 符合條件的加入 tempRenderList 
        addToTempRenderList(filterKeyword, groupName);
      } else {
        groupNameArr.forEach(function (nameItem) {
          // if(groupName===nameItem){
          //   addToTempRenderList(filterKeyword,groupName);
          // }else{
          //   tempRenderList.forEach(tempItem=>{
          //       if(groupName=="lang"){
          //           if(tempItem.classify.lang.length === 1 &&
          //             filterKeyword !== tempItem.classify.lang[0]){
          //                 tempRenderList.splice(tempItem,1);
          //                 groupNameArr.push(groupName); 
          //           }
          //       }else if(filterKeyword !== tempItem.classify[groupName]){
          //           tempRenderList.splice(tempItem,1);
          //           groupNameArr.push(groupName); 
          //       }
          //   })
          // }

          /****************上面是原本寫法***************88 */
          // if(groupName===nameItem){
          //     if(groupName=="lang"){
          //       //addToTempRenderList(filterKeyword,groupName);
          //     }else{
          //       addToTempRenderList(filterKeyword,groupName);
          //     }
          // }
          if (groupName === nameItem) {
            addToTempRenderList(filterKeyword, groupName);
          } else {
            tempRenderList.forEach(function (tempItem) {
              if (groupName == "lang") {
                if (tempItem.classify.lang.length === 1) {
                  if (filterKeyword !== tempItem.classify.lang[0]) {
                    tempRenderList.splice(tempItem, 1);
                  }
                } else {
                  tempItem.classify.lang.forEach(function (langItem) {
                    console.log("langItem");
                    console.log(langItem);
                    console.log("tempItem");
                    console.log(tempItem);
                    console.log("filterKeyword");
                    console.log(filterKeyword); // if(filterKeyword !== langItem){
                    //   tempRenderList.splice(tempItem,1);
                    // }

                    tempRenderList = tempRenderList.filter(function (item) {
                      return langItem !== filterKeyword;
                    });
                  });
                }
              } else {
                if (filterKeyword !== tempItem.classify[groupName]) {
                  tempRenderList.splice(tempItem, 1);
                }
              }

              groupNameArr.push(groupName);
            });
          }

          console.log("tempRenderList");
          console.log(tempRenderList);
          console.log("groupNameArr");
          console.log(groupNameArr);
        }); //end groupNameArr forEach
      }
    } else {//checked == false
        //補 groupNameArr tempRenderList 去除重複 
        //removeFromTempRenderList(filterKeyword,groupName);
        //console.log("tempRenderList");
        //console.log(tempRenderList);
      }
  });
});
/************************end 暫時新增************************************* */

/************************暫時隱藏************************************* */

var filterCheckedArr = [];
filterItemInput.forEach(function (item, index) {
  item.addEventListener("change", function (e) {
    if (e.target.checked) {
      var filterKeywords = item.getAttribute("name");
      filterCheckedArr.push(filterKeywords);
    } else {
      filterCheckedArr.forEach(function (arrItem, i) {
        if (arrItem == item.getAttribute("name")) {
          filterCheckedArr.splice(i, 1);
        }
      });
    }

    console.log("filterCheckedArr");
    console.log(filterCheckedArr);
    getRenderList(resourcesData);
    renderFilterResultList();
  });
});

function getRenderList(resourcesData) {
  //console.log(resourcesData);
  //2. 比對關鍵字filterCheckedArr & resourcesData 取得要 render 的清單先放進 resourcesRenderList
  var resourcesRenderList = [];
  resourcesData.forEach(function (item) {
    var langItemStr = ""; //取得 lang 陣列中的文字

    item.classify.lang.forEach(function (langItem) {
      langItemStr = langItem;
      filterCheckedArr.forEach(function (checkedItem) {
        if (item.classify.type === checkedItem || item.classify.level === checkedItem || item.classify.price === checkedItem || langItemStr === checkedItem) {
          resourcesRenderList.push(item); // console.log("resourcesRenderList")
          // console.log(resourcesRenderList)
        }
      });
    });
  }); //3. 去除 resourcesRenderList 重複 id 項目

  var set = new Set();
  newResourcesRenderList = resourcesRenderList.filter(function (item) {
    //return (!set1.has(item.id) ? set1.add(item.id) : false)
    //如果陣列中沒有該項目, 就加入陣列
    if (!set.has(item.id)) {
      return set.add(item.id);
    } else {
      return false;
    }
  }); // console.log("newResourcesRenderList");
  // console.log(newResourcesRenderList);
} // end getRenderList(resourcesData)

/************************暫時隱藏*************************************88 */
//把 resourcesData 裡符合  filterCheckedArr 條件的項目丟進 resourcesRenderList 


function renderFilterResultList() {
  // n 個結果結果
  //filterAndSort();
  getRenderList(resourcesData); //取得 final 渲染清單 newResourcesRenderList
  //每一次checked有異動, 就重新取得要渲染的清單
  // console.log("newResourcesRenderList");
  // console.log(newResourcesRenderList);
  // console.log(newResourcesRenderList.length);
  //取得分數
  // let resultScore2 = getAverageScore();
  // let newResultScoreOjb2 = combineCommentStar(resultScore2); 

  var renderfilterStr = "";
  var finalRenderList = "";

  if (newResourcesRenderList.length == 0) {
    finalRenderList = resourcesData;
  } else {
    finalRenderList = newResourcesRenderList;
  } // console.log("renderfilterStr");
  // console.log(renderfilterStr);
  //渲染資源


  finalRenderList.forEach(function (item) {
    renderfilterStr += "<div class=\"row my-3 \">\n    <div class=\"col-2 \">\n        <img src=\"".concat(item.imgUrl, "\" alt=\"").concat(item.title, "\">   \n    </div>\n      <div class=\"col-6\">\n          <h4 class=\"fs-7\">").concat(item.title, "</h4>\n          <div class=\"d-flex flex-wrap align-items-center\">\n              <span class=\"fs-7 fw-bold me-lg-2\">??</span>\n              <ul class=\"d-flex align-items-center lh-1 me-lg-2\">\n                  <li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>\n                  <li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>\n                  <li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>\n                  <li><span class=\"material-icons material-icons-sharp fs-8\">star_half</span></li>\n                  <li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>\n              </ul>                                \n              <span class=\"fs-8\">(35)</span>\n              <p>").concat(item.classify.type, ", ").concat(item.classify.level, " , ").concat(item.classify.price, ", ").concat(item.classify.lang, " </p>\n          </div>\n      </div>\n      <div class=\"col-4\">\n          <div class=\"d-flex flex-column align-items-end\">\n              <button type=\"button\" class=\"btn btn-tiffany my-2 w-75\">\u524D\u5F80\u8CC7\u6E90</button>\n              <button type=\"button\" class=\"btn btn-yellowBrown w-75 my-2\">\u67E5\u770B\u8A55\u8AD6</button>\n          </div>\n      </div>\n    </div>\n        ");
  });

  if (resourceItem !== null) {
    resourceItem.innerHTML = renderfilterStr;
  }
}
/***************************************8 */

/***************** n 筆結果 / 清除篩選 / 排序 ***************/


var resultNumber = document.querySelector('.resultNumber');
var clearFilterBtn = document.querySelector('#clearFilterBtn');
var resourceSort = document.querySelector('#resourceSort');

function filterAndSort() {
  var filterResultNum = newResourcesRenderList.length;
  var renderNum = 0; //console.log(filterResultNum);

  if (filterResultNum == 0) {
    resourcesData.forEach(function (item) {
      if (item.topics == "JavaScript") {
        renderNum += 1;
      }
    });
    filterResultNum = renderNum; //clearFilterBtn.textContent = "";  //清除篩選結果按鈕文字
  } // resultNumber.textContent = `${filterResultNum}個結果`;


  clearFilterBtn.addEventListener("click", function (e) {});
}
//# sourceMappingURL=all.js.map
