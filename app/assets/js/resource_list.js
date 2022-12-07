
//1. 頁面初始化
function init(){
  getResources();
    
}
init();


/*****************入門推薦 ***************/

const foundation1Basic = document.querySelector('#foundation1Basic > div.row');
const foundation2Free = document.querySelector('#foundation2Free > div.row');
const foundation3CN = document.querySelector('#foundation3CN > div.row');

let resourcesData = [];
let commentsData = [];

//2. 取得資料
function getResources(){
  axios.get('./json/db.json')
  .then(res=>{
    resourcesData = res.data.resources;
    commentsData = res.data.comments;
    renderFoundationRecommond();
    renderFilterResultList();
    //getAverageScore();
    //filterAndSort();
  
  }).catch(error=>{
    console.log(error);
  })
}


//3. 渲染入門推薦資料
function renderFoundationRecommond(){

  let resultScore = getAverageScore();
  let newResultScoreOjb = combineCommentStar(resultScore); //newResultScore

  //組各tab render HTML
  let basicStr ="";
  let freeStr="";
  let cnStr="";

  resourcesData.forEach( (item,index)=>{
        if(item.classify.level === "初階"){
            basicStr += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
        }
        
        if(item.classify.price === "免費"){
          freeStr += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);  
        }
        
        item.classify.lang.forEach(langItem=>{
          if(langItem === "繁體中文"){
            cnStr += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
          }
        })

  })
  //console.log(basicStr);
  // console.log(freeStr);
  // console.log(cnStr);
  foundation1Basic.innerHTML = basicStr;
  foundation2Free.innerHTML = freeStr;
  foundation3CN.innerHTML = cnStr;

}

//計算分數
let scoreTotal = {};  //每筆資源評價 總分
let resourceIdObj = {}; //每筆資源評價 筆數
let resultScore = {};  //每筆資源 平均分數(星星數)
function getAverageScore(){
  commentsData.forEach(item=>{
      if(resourceIdObj[item.resourceId] === undefined){
          resourceIdObj[item.resourceId] = 1;
          scoreTotal[item.resourceId] = item.score;
          
      }else{
          resourceIdObj[item.resourceId] +=1;
          scoreTotal[item.resourceId] += item.score;

      }
      resultScore[item.resourceId] = (scoreTotal[item.resourceId] /  resourceIdObj[item.resourceId]).toFixed(1);
  })
  return resultScore;
  //console.log(resultScore);  //1: '4.0', 2: '3.3', 3: '4.5', 4: '2.8'}
}


//4. 組星星字串
function combineCommentStar(resultScore){
  //評論分數+星星+筆數 HTML
  let newResultScore = {...resultScore};
  let resourceIdArr = Object.keys(newResultScore);  //['1, '2, '3'] 
  let scoreArr = Object.values(newResultScore); //['4.0', '3.3', '4.5' ,'2.8'] 

  scoreArr.forEach((item,index)=>{
    let starStr=""; //星星HTML String
    //星星數
    for(let i=1; i<=item[0] ;i++){
      starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li>`;
      newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
    }
    
    //半顆星星+空星星  
      if(item[2]<=2){
        for(let i=1; i<=(5-item[0]) ;i++){
          starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li> `;
          newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
        }
        
      }else if(item[2] >=3 && item[2] <=7){
          starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_half</span></li>`;
          for(let i=1; i<=(5-item[0]-1) ;i++){
            starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
          }
          newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
       
      }else if(item[2]>=8){
          starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li`;
        for(let i=1; i<=(5-item[0]-1) ;i++){
          starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
          newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
        }
      }

  })
  return newResultScore;
}

//5. 入門推薦組單一資源項目html
function combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj){

  if( item.imgUrl ===""){
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if(resultScore[`${index+1}`]===undefined || newResultScoreOjb[item.id]=== undefined || resourceIdObj[`${index+1}`]=== undefined ){

    return  `
    <div class="col-lg-2 col-md-4 col-6">
    <div>
        <p class="text-center">
            <a href="./resource.html" target="_blank">
            <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"/></a></p>
        <div class="p-2">
            <h4 class="fs-7"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>
            <div class="d-flex flex-wrap justify-content-between align-items-center">                             
                <span class="fs-8"> 尚無評價 </span>
            </div>
  
        </div>
    </div>
    </div>
    `;
  }else{
    return  `
      <div class="col-lg-2 col-md-4 col-6">
      <div>
          <p class="text-center">
              <a href="./resource.html" target="_blank">
              <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"/></a></p>
          <div class="p-2">
              <h4 class="fs-7"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>

              <div class="d-flex flex-wrap justify-content-between align-items-center">
                  <span class="fs-7 fw-bold me-lg-2"> ${resultScore[`${index+1}`]}</span>
                  <ul class="d-flex align-items-center lh-1 me-lg-2">
                  ${newResultScoreOjb[item.id]}
                  </ul>                                
                  <span class="fs-8">(${resourceIdObj[`${index+1}`]})</span>
              </div>

          </div>
      </div>
      </div>
      `;
  }
      
}

//判斷圖片處理


//圖片顯示比例問題 


/***************** 相關主題 ***************/



/***************** 資源篩選 ***************/

const resourceItem = document.querySelector('.resourceItem');
// const filter = document.querySelector('.filter');
const filterItemInput = document.querySelectorAll('.filterItem > input');  



// final 渲染清單
let newResourcesRenderList = getRenderList(resourcesData);
// let newResourcesRenderList = [];

//1. checked 監聽 : 取得 checked 清單的關鍵字 + render


/************************暫時新增************************************* */

let tempRenderList = [];
let groupNameArr=[];  // ['type', 'type', 'level']
//let checkedKeyWords =[]; //


//比對resourcesData原始資料, 符合條件的加入 tempRenderList 
function addToTempRenderList(filterKeyword,groupName){
  resourcesData.forEach((resItem,resIndex)=>{
    if(resItem.classify.lang.langth===1){
      if(filterKeyword === resItem.classify[groupName] || 
        filterKeyword === resItem.classify.lang[0] ){
          tempRenderList.push(resItem);
          groupNameArr.push(groupName); 
          //checkedKeyWords.push(filterKeyword);
      }
    }else{
      resItem.classify.lang.forEach(langItem=>{
         if(filterKeyword === resItem.classify[groupName] ||
           filterKeyword === langItem ){
             tempRenderList.push(resItem);
             groupNameArr.push(groupName); 
            // checkedKeyWords.push(filterKeyword);
         }
       })   
    }

    //每次加完先去除重複項目
    const set = new Set();
    tempRenderList = tempRenderList.filter((item) => {
      return (!set.has(item.id) ? set.add(item.id) : false)
    });

    groupNameArr = groupNameArr.filter((item) => {
      return (!set.has(item) ? set.add(item) : false)
    });


  })
  console.log("tempRenderList");
  console.log(tempRenderList);
  console.log("groupNameArr");
  console.log(groupNameArr);
}


function removeFromTempRenderList(filterKeyword,groupName){

  //1. 同 groupName 情況
  tempRenderList.forEach((resItem,resIndex)=>{

    // console.log("groupName",groupName);  //lang
    // console.log("filterKeyword",filterKeyword); //繁體中文

    if(groupName === "lang"){
      // console.log(resItem.classify.lang.length); 
      if(resItem.classify.lang.length===1){
        if(filterKeyword === resItem.classify.lang[0] ){
          tempRenderList.splice(resIndex,1);
        }

      }else{
        //如果 lang 有多筆
        resItem.classify.lang.forEach(langItem=>{
          if(filterKeyword === langItem){
            tempRenderList.splice(resIndex,1);
          }
          // tempRenderList = tempRenderList.filter(item=>{

          //   return  langItem != filterKeyword;
          // })
        })

        // tempRenderList = tempRenderList.filter(item=>{
        //     item.classify.lang.forEach(langItem=>{
        //       return  langItem != filterKeyword;
        //     })
        // })
      }

    }else if(filterKeyword === resItem.classify[groupName]){
      tempRenderList = tempRenderList.filter(item=>{
        return item.classify[groupName] != filterKeyword;
      })
    }

   
      
      // if(groupName === "lang"){
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
  })
}

filterItemInput.forEach((inputItem,index)=>{
  inputItem.addEventListener("change",e=>{
    
    let filterKeyword = e.target.getAttribute("name"); 
    let groupName = e.target.getAttribute("data-group");
    console.log(filterKeyword,groupName);

    if (e.target.checked) {
      //1. 檢查是否為第一筆資料 (即第一個checked 項目)
      if(tempRenderList.length === 0 && groupNameArr.length === 0){
        //比對resourcesData原始資料, 符合條件的加入 tempRenderList 
        addToTempRenderList(filterKeyword,groupName);
        
      }else{
        groupNameArr.forEach(nameItem=>{
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

          if(groupName===nameItem){
            addToTempRenderList(filterKeyword,groupName);
          }else{
            tempRenderList.forEach(tempItem=>{
                if(groupName=="lang"){
                    if(tempItem.classify.lang.length === 1){
                      if(filterKeyword !== tempItem.classify.lang[0]){
                          tempRenderList.splice(tempItem,1);    
                      }  
                    }else{
                      tempItem.classify.lang.forEach(langItem=>{
                        console.log("langItem");
                        console.log(langItem);
                        console.log("tempItem");
                        console.log(tempItem);
                        console.log("filterKeyword");
                        console.log(filterKeyword);
                        // if(filterKeyword !== langItem){
                        //   tempRenderList.splice(tempItem,1);
                        // }
                        tempRenderList = tempRenderList.filter(item=>{
                          return langItem !== filterKeyword ;
                        })
                      })
                    }
                }else{
                  if(filterKeyword !== tempItem.classify[groupName]){
                    tempRenderList.splice(tempItem,1);
                    
                  }
                }
                groupNameArr.push(groupName);
            })
          }

          console.log("tempRenderList");
          console.log(tempRenderList);
          console.log("groupNameArr");
          console.log(groupNameArr);
        }) //end groupNameArr forEach
      }
      
    } else{
      //checked == false
      //補 groupNameArr tempRenderList 去除重複 
      //removeFromTempRenderList(filterKeyword,groupName);
      //console.log("tempRenderList");
      //console.log(tempRenderList);
    }

  })

})




/************************end 暫時新增************************************* */



/************************暫時隱藏************************************* */
let filterCheckedArr=[];
filterItemInput.forEach((item,index)=>{
  item.addEventListener("change",e=>{
    if (e.target.checked) {
      let filterKeywords = item.getAttribute("name");
      filterCheckedArr.push(filterKeywords);
    } else {
      filterCheckedArr.forEach((arrItem,i)=>{
          if(arrItem==item.getAttribute("name")){
            filterCheckedArr.splice(i,1);
          }
        })
    }
    console.log("filterCheckedArr");
    console.log(filterCheckedArr);
    getRenderList(resourcesData);
    renderFilterResultList();
  })
})


function getRenderList(resourcesData){
  //console.log(resourcesData);
  //2. 比對關鍵字filterCheckedArr & resourcesData 取得要 render 的清單先放進 resourcesRenderList
  let resourcesRenderList = [];
  resourcesData.forEach(item=>{  
    let langItemStr="";  //取得 lang 陣列中的文字
    item.classify.lang.forEach(langItem=>{  
        langItemStr = langItem;
        filterCheckedArr.forEach(checkedItem=>{    

          if(item.classify.type === checkedItem ||
            item.classify.level === checkedItem ||
            item.classify.price === checkedItem ||
            langItemStr === checkedItem
          ){
              resourcesRenderList.push(item);
              // console.log("resourcesRenderList")
              // console.log(resourcesRenderList)
          }     
        })
    })
  })

  //3. 去除 resourcesRenderList 重複 id 項目
  const set = new Set();
  newResourcesRenderList = resourcesRenderList.filter((item) => {
    //return (!set1.has(item.id) ? set1.add(item.id) : false)
    //如果陣列中沒有該項目, 就加入陣列
    if(!set.has(item.id)){  
      return set.add(item.id)
    }else {
      return false;
    }
  });
  console.log("newResourcesRenderList");
  console.log(newResourcesRenderList);
  // return newResourcesRenderList;
  //renderFilterResultList();
}  // end getRenderList(resourcesData)

/************************暫時隱藏*************************************88 */


//把 resourcesData 裡符合  filterCheckedArr 條件的項目丟進 resourcesRenderList 
function renderFilterResultList(){
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

  let renderfilterStr="";
  let finalRenderList = "";
  if(newResourcesRenderList.length==0){
    finalRenderList = resourcesData;
  }else{
    finalRenderList = newResourcesRenderList;
  }

  // console.log("renderfilterStr");
  // console.log(renderfilterStr);

  //渲染資源
  finalRenderList.forEach(item=>{
    renderfilterStr +=`<div class="row my-3 ">
    <div class="col-2 ">
        <img src="${item.imgUrl}" alt="${item.title}">   
    </div>
      <div class="col-6">
          <h4 class="fs-7">${item.title}</h4>
          <div class="d-flex flex-wrap align-items-center">
              <span class="fs-7 fw-bold me-lg-2">??</span>
              <ul class="d-flex align-items-center lh-1 me-lg-2">
                  <li><span class="material-icons material-icons-sharp fs-8">star</span></li>
                  <li><span class="material-icons material-icons-sharp fs-8">star</span></li>
                  <li><span class="material-icons material-icons-sharp fs-8">star</span></li>
                  <li><span class="material-icons material-icons-sharp fs-8">star_half</span></li>
                  <li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>
              </ul>                                
              <span class="fs-8">(35)</span>
              <p>${item.classify.type}, ${item.classify.level} , ${item.classify.price}, ${item.classify.lang} </p>
          </div>
      </div>
      <div class="col-4">
          <div class="d-flex flex-column align-items-end">
              <button type="button" class="btn btn-tiffany my-2 w-75">前往資源</button>
              <button type="button" class="btn btn-yellowBrown w-75 my-2">查看評論</button>
          </div>
      </div>
    </div>
        `;
  })
  
  

  resourceItem.innerHTML = renderfilterStr;


}


/***************************************8 */






/***************** n 筆結果 / 清除篩選 / 排序 ***************/

const resultNumber = document.querySelector('.resultNumber');
const clearFilterBtn = document.querySelector('#clearFilterBtn');
const resourceSort = document.querySelector('#resourceSort');

function filterAndSort(){
  let filterResultNum = newResourcesRenderList.length;
  let renderNum = 0;
  //console.log(filterResultNum);
  if(filterResultNum == 0){
    resourcesData.forEach(item=>{
      if(item.topics=="JavaScript"){
        renderNum +=1;
      }
    })

    filterResultNum = renderNum; 

    //clearFilterBtn.textContent = "";  //清除篩選結果按鈕文字

  }
 // resultNumber.textContent = `${filterResultNum}個結果`;


  clearFilterBtn.addEventListener("click",e=>{
    
  })

}


