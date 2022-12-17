
//1. 頁面初始化
function initResourceList(){
  getResourcesForResources();
  getCommentData();
}
initResourceList();


/*****************top ***************/

const bannerBlockTitle = document.querySelector('.bannerBlock > h2');

if(resTopic!==undefined && bannerBlockTitle!==null){
  bannerBlockTitle.textContent = resTopic;

}

/*****************入門推薦 ***************/

const foundation1Basic = document.querySelector('#foundation1Basic > div.row');
const foundation2Free = document.querySelector('#foundation2Free > div.row');
const foundation3CN = document.querySelector('#foundation3CN > div.row');

let resourcesData = [];
let commentsData = [];
let thisTopicData = [];

//2. 取得資料
function getResourcesForResources(){
  axios.get(`${url}/resources`)
  .then(res=>{
    resourcesData = res.data.filter(item=>{
      return item.topics == resTopic;
    })
    renderFoundationRecommond();
    renderFilterResultList();
    sortResourcesList();

  }).catch(error=>{
    console.log(error);
  })
}

function getCommentData(){
  axios.get(`${url}/comments`)
  .then(res=>{
    commentsData = res.data; 
  }).catch(error=>{
    console.log(error);
  })
}


//3. 渲染入門推薦資料
function renderFoundationRecommond(){

  let commentScoreNum = getAverageScore();
  let resultScore = commentScoreNum[0];
  let commentNum = commentScoreNum[1];
  let starStr = combineCommentStar(resultScore); //newResultScore

  let itemNum1 = 0;
  let itemNum2 = 0;
  let itemNum3 = 0;
  let renderMaxNum = 6;
  //組各tab render HTML
  let basicStr ="";
  let freeStr="";
  let cnStr="";

  resourcesData.forEach( (item,index)=>{
    
   
      if(item.level === "初階"){
        if(itemNum1 <renderMaxNum){
           basicStr += combineResouorceItem(item,resultScore,starStr,commentNum);
           itemNum1+=1;
        }
         
      }
      
      if(item.price === "免費"){
        if(itemNum2 <renderMaxNum){
          freeStr += combineResouorceItem(item,resultScore,starStr,commentNum); 
          itemNum2+=1;
        }
         
      }
      
      item.lang.forEach(langItem=>{
        if(langItem === "繁體中文"){
          if(itemNum3 <renderMaxNum){
            cnStr += combineResouorceItem(item,resultScore,starStr,commentNum);
            itemNum3+=1;
          }
          
        }
      })
    
  })

  if(foundation1Basic!==null){
    document.title = resTopic;
    foundation1Basic.innerHTML = basicStr;
  }
  
  if(foundation2Free!==null){
    document.title = resTopic;
    foundation2Free.innerHTML = freeStr;
  }
  
  if(foundation3CN!==null){
    document.title = resTopic;
    foundation3CN.innerHTML = cnStr;
  }
}


function getAverageScore(){

let scoreTotal = {};  //每筆資源評價 總分
let resourceIdObj = {}; //每筆資源評價 筆數
let resultScore = {};  //每筆資源 平均分數(星星數)

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
  // console.log("resourceIdObj",resourceIdObj);
  // console.log("scoreTotal",scoreTotal);
  // console.log("resultScore",resultScore);
  return [resultScore,resourceIdObj];
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
function combineResouorceItem(item,resultScore,starStr,commentNum){

  if( item.imgUrl ===""){
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if(resultScore[item.id]===undefined || starStr[item.id]=== undefined || commentNum[item.id]=== undefined ){

    return  `
    <div class="col-lg-2 col-md-4 col-6">
    <div>
        <p class="text-center">
            <a href="./resource.html?id=${item.id}" >
            <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"></a></p>
        <div class="p-2">
            <h4 class="fs-7 ellipsis"><a href="./resource.html?id=${item.id}" > ${item.title}</a></h4>
            <div class="d-flex flex-wrap justify-content-between align-items-center">                             
                <span class="fs-8 text-gray"> 尚無評價 </span>
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
              <a href="./resource.html?id=${item.id}" >
              <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"></a></p>
          <div class="p-2">
              <h4 class="fs-7 ellipsis"><a href="./resource.html?id=${item.id}" > ${item.title}</a></h4>

              <div class="d-flex flex-wrap justify-content-between align-items-center text-secondary">
                  <span class="fs-7 fw-bold me-lg-2"> ${resultScore[item.id]}</span>
                  <ul class="d-flex align-items-center lh-1 me-lg-2">
                  ${starStr[item.id]}
                  </ul>                                
                  <span class="fs-8">(${commentNum[item.id]})</span>
              </div>

          </div>
      </div>
      </div>
      `;
  }
      
}

/***************** 相關主題 ***************/
const relatedTopic = document.querySelector('.relatedTopic');
if(resTopic=="JavaScript"){
  relatedTopic.innerHTML = `
  <div class="col">
    <div class="topicItem text-center my-2  p-3 rounded-3">
    <a href="./resource_list.html?topics=HTML/CSS"><h4 class="fs-6 mb-0">HTML/CSS</h4></a>
    </div>
  </div>`;
}else if(resTopic=="HTML/CSS"){
  relatedTopic.innerHTML = `
  <div class="col">
    <div class="topicItem text-center my-2  p-3 rounded-3">
    <a href="./resource_list.html?topics=JavaScript"><h4 class="fs-6 mb-0">JavaScript</h4></a>
    </div>
  </div>`;
}else if(resTopic=="Python"){
  document.querySelector('.relatedContainer').setAttribute("class","d-none");
}



/***************** 資源篩選 ***************/

const resourceItem = document.querySelector('.resourceItem');
const filterItemInput = document.querySelectorAll('.filterItem > input');  

let checkObj={};
let renderList=[];
let newSortRenderList=[];

// checked 監聽 : 取得 checked 清單的關鍵字 + render
filterItemInput.forEach((item,index)=>{

  item.addEventListener("change",e=>{
    let filterKeyword = item.getAttribute("name");
    let groupName = item.getAttribute("data-group");
    // console.log(filterKeyword,groupName);

    if (e.target.checked) {
      if(checkObj[groupName]===undefined){
        checkObj[groupName]=[];
        checkObj[groupName].push(filterKeyword);
      }else{
        checkObj[groupName].push(filterKeyword);
      }
    }else {
        checkObj[groupName] = checkObj[groupName].filter(item=>{
          return filterKeyword !=item;
        })  
        if(checkObj[groupName].length===0){
          delete checkObj[groupName];
        }
    }

    renderList = resourcesData.filter(resItem=>{
      
      let hasType = true ;  
      let hasLevel =true;
      let hasPrice =true;
      let checkLang = true;
  
      if(checkObj.type){
        hasType = checkObj.type.includes(resItem.type);
      }
      if(checkObj.level){
        hasLevel = checkObj.level.includes(resItem.level);
      }
      if(checkObj.price){
        hasPrice = checkObj.price.includes(resItem.price);
      }
  
      checkLang = resItem.lang.some((str) => {
        //console.log(str);
        if (!checkObj.lang) {
          return true;
        }
        return checkObj.lang.includes(str);
      });
  
      return hasType && hasLevel && hasPrice && checkLang ;
  
    })
    renderFilterResultList(); 
  })
})



let sortList = [];

function renderFilterResultList(){ 
  //render前 先排序
  let commentScoreNum = getAverageScore();
  let resultScore = commentScoreNum[0];
  let commentNum = commentScoreNum[1];
  let starStr = combineCommentStar(resultScore);

    let renderfilterStr="";
    if(renderList.length===0){
      sortList = sortResourcesList(resourcesData);
      sortList.forEach(renderItem=>{
        renderfilterStr += combineResouorceItemType2(renderItem,resultScore,starStr,commentNum);
      })

      if(resultNumber!==null){
        resultNumber.setAttribute("class","d-none");
      }
      if(clearBtnText!==null){
        clearBtnText.setAttribute("class","d-none");
      }    

      if(checkObj.type !== undefined || checkObj.level !== undefined || checkObj.price !== undefined || checkObj.lang !== undefined ){
        renderfilterStr = "沒有符合條件的項目";
      }
    }else{
      if(resultNumber!==undefined){
         resultNumber.setAttribute("class","d-inline-block");
          resultNumber.textContent = `${renderList.length} 個篩選結果`;
      }
      if(clearBtnText!==undefined){
        clearBtnText.setAttribute("class","d-inline-block");
      }
      
      if(checkObj.type==undefined && checkObj.level==undefined && checkObj.price==undefined && checkObj.lang==undefined ){
        resultNumber.setAttribute("class","d-none");
        clearBtnText.setAttribute("class","d-none");
      }

      sortList = sortResourcesList(renderList);
      sortList.forEach(renderItem=>{
        renderfilterStr += combineResouorceItemType2(renderItem,resultScore,starStr,commentNum);
      })
    }

    if(resourceItem!==null){
      resourceItem.innerHTML = renderfilterStr;
    }
}


function combineResouorceItemType2(renderItem,resultScore,starStr,commentNum){
  if( renderItem.imgUrl ===""){
    renderItem.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if(resultScore[renderItem.id]===undefined || starStr[renderItem.id]=== undefined || commentNum[renderItem.id]=== undefined ){
    return `<div class="row my-3 ">
    <div class="col-2 ">
      <a href="./resource.html?id=${renderItem.id}" ><img src="${renderItem.imgUrl}" alt="${renderItem.title}"></a>
    </div>
      <div class="col-6">
          <h4 class="fs-7"><a href="./resource.html?id=${renderItem.id}" >${renderItem.title}</a></h4>
          <div class="d-flex flex-wrap align-items-center">
              <span class="fs-8 text-gray fw-bold me-lg-2"> 尚無評價</span>
             
          </div>
      </div>
      <div class="col-4">
          <div class="d-flex flex-column flex-lg-row  align-items-end">
              <a href="${renderItem.url}" target="_blank" role="button" class="btn btn-tiffany my-2 w-75 mx-2">前往資源</a>
              <a href="./resource.html?id=${renderItem.id}"  role="button" class="btn btn-yellowBrown my-2 w-75 mx-2">查看內容</a>
          </div>
      </div>
    </div>`;
  }else{
    return `<div class="row my-3 ">
  <div class="col-2 ">
     <a href="./resource.html?id=${renderItem.id}" ><img src="${renderItem.imgUrl}" alt="${renderItem.title}"></a>  
  </div>
    <div class="col-6">
     <h4 class="fs-7"><a href="./resource.html?id=${renderItem.id}" >${renderItem.title}</a></h4>
        <div class="d-flex flex-wrap align-items-center text-secondary">
            <span class="fs-7 fw-bold me-lg-2"> ${resultScore[renderItem.id]}</span>
            <ul class="d-flex align-items-center lh-1 me-lg-2  ">
            ${starStr[renderItem.id]}
            </ul>                                
            <span class="fs-8">(${commentNum[renderItem.id]})</span>
           
        </div>
    </div>
    <div class="col-4">
        <div class="d-flex flex-column flex-lg-row  align-items-end">
          <a href="${renderItem.url}" target="_blank" role="button" class="btn btn-tiffany my-2 w-75 mx-2">前往資源</a>
          <a href="./resource.html?id=${renderItem.id}"  role="button" class="btn btn-yellowBrown my-2 w-75 mx-2">查看內容</a>
        </div>  
    </div>
  </div>
      `;
  }
  
}

/***************** n 筆結果 / 清除篩選  ***************/

const resultNumber = document.querySelector('.resultNumber');
const clearBtnText = document.querySelector('.clearBtnText');
const clearFilterBtn = document.querySelector('#clearFilterBtn');

  if(clearFilterBtn!==null){
    clearFilterBtn.addEventListener("click",e=>{
      if(checkObj.type){
        delete checkObj.type;
      }
      if(checkObj.level){
        delete checkObj.level;
      }
      if(checkObj.price){
        delete checkObj.price;
      }
      if(checkObj.lang){
        delete checkObj.lang;
      }
      filterItemInput.forEach(item=>{
        item.checked = false;
      })
      renderList =[];
      renderFilterResultList();
    })
  }
  



/*********************** 排序 ***********************/

const resourceSort = document.querySelector('#resourceSort');

function sortResourcesList(resRenderList){
  if(resourceSort!==null || resourceSort!==undefined){

     if(resourceSort?.value=="heightRate"){
      resRenderList = resRenderList?.sort((a,b)=>{
        return b.averageScore - a.averageScore;
     })
     
    }else if(resourceSort?.value=="new"){
      resRenderList = resRenderList?.sort((a,b)=>{
        return b.id - a.id;
     })

    }
  }
   
    return resRenderList;
}

if(resourceSort!==null){
  resourceSort.addEventListener("change",e=>{
    renderFilterResultList();
  })
}
