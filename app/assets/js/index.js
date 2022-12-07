
//1. 頁面初始化
function initIndex(){
    getResourcesForIndex();
    
}
initIndex();

//好評推薦
const goodRate1 = document.querySelector('#goodRate1 > div.row');
const goodRate2 = document.querySelector('#goodRate2 > div.row');
const goodRate3 = document.querySelector('#goodRate3 > div.row');
const goodRate1Tab = document.querySelector('#goodRate1-tab');
const goodRate2Tab = document.querySelector('#goodRate2-tab');
const goodRate3Tab = document.querySelector('#goodRate3-tab');

//最新免費資源
const resourceType1 = document.querySelector('#resourceType1 > div.row');
const resourceType2 = document.querySelector('#resourceType2 > div.row');
const resourceType3 = document.querySelector('#resourceType3 > div.row');
const resource1Tab = document.querySelector('#resource1-tab');
const resource2Tab = document.querySelector('#resource2-tab');
const resource3Tab = document.querySelector('#resource3-tab');

console.log(resource1Tab);

let resourcesData = [];
let commentsData = [];

//取得資源資料
function getResourcesForIndex(){
  axios.get('./json/db.json')
  .then(res=>{
    resourcesData = res.data.resources;
    commentsData = res.data.comments;
    renderGoodRateList();
    renderNewFreeList();
  
  }).catch(error=>{
    console.log(error);
  })
}

//渲染好評推薦資料
function renderGoodRateList(){
    let resultScore = getAverageScore();
    let newResultScoreOjb = combineCommentStar(resultScore); //newResultScore
    let itemNum1 = 0;
    let itemNum2 = 0;
    let itemNum3 = 0;
    let renderMaxNum = 6;
    let tabJS ="";
    let tabHtml="";
    let tabPython="";

    resourcesData.forEach( (item,index)=>{
        switch (item.topics){
            case "JavaScript" :
                if(itemNum1 <renderMaxNum){
                    tabJS += combineResouorceItemType1(item,index,resultScore,newResultScoreOjb,resourceIdObj);
                   itemNum1 +=1;
                }
                break;

            case "HTML/CSS" :
                if(itemNum2 < renderMaxNum){
                    tabHtml += combineResouorceItemType1(item,index,resultScore,newResultScoreOjb,resourceIdObj);
                    itemNum2+=1;
                }
                break;

            case "Python" :
                if(itemNum3 < renderMaxNum){
                     tabPython += combineResouorceItemType1(item,index,resultScore,newResultScoreOjb,resourceIdObj);
                itemNum3+=1
                }
               
                break;
        }
        //itemNum +=1;
    })

    if(goodRate1 !==null ){
        if(tabJS==""){
            goodRate1Tab.setAttribute("class", "d-none");
        }
        goodRate1.innerHTML = tabJS;
    }
    if(goodRate2 !==null ){
        if(tabHtml==""){
            goodRate2Tab.setAttribute("class", "d-none");
        }
        goodRate2.innerHTML = tabHtml;
    }
    if(goodRate3 !==null ){
        if(tabPython==""){
            goodRate3Tab.setAttribute("class", "d-none");
        }
        goodRate3.innerHTML = tabPython;
    }

}


//組單一資源項目html - type 1
function combineResouorceItemType1(item,index,resultScore,newResultScoreOjb,resourceIdObj){

  if( item.imgUrl ===""){
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if(resultScore[`${index+1}`]===undefined || newResultScoreOjb[item.id]=== undefined || resourceIdObj[`${index+1}`]=== undefined ){

    return  `
    <div class="col-md-6 col-lg-4">
    <div class="d-flex p-2 align-items-center">
        <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg">
        <div class="p-2">
            <h4 class="ellipsis"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>
            <div class="d-flex justify-content-between align-items-center">
            尚無評價
            </div>
        </div>
    </div>
    </div>
    `;
  }else{
    return  `
    <div class="col-md-6 col-lg-4">
    <div class="d-flex p-2 align-items-center">
        <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg">
        <div class="p-2">
            <h4 class="ellipsis"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>
            <div class="d-flex justify-content-between align-items-center">
                <span class="fs-6 fw-bold"> ${resultScore[`${index+1}`]}</span>
                <ul class="d-flex align-items-center lh-1">
                ${newResultScoreOjb[item.id]}
                </ul>                                
                <span class="fs-7">(${resourceIdObj[`${index+1}`]})</span>
            </div>
        </div>
    </div>
    </div>`;
  }
      
}

//渲染最新免費資源
function renderNewFreeList(){
    let resultScore = getAverageScore();
    let newResultScoreOjb = combineCommentStar(resultScore); //newResultScore

    let tabOnline ="";
    let tabOffline="";
    let tabArticle="";

    resourcesData.forEach( (item,index)=>{
        if(item.classify.price==="免費"){
            if(item.classify.type==="線上課程"){
                tabOnline += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
            }

            if(item.classify.type==="實體課程"){
                tabOffline += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
            }

            if(item.classify.type==="文章"){
                tabArticle += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
            }
        }
 
    })

    if(resourceType1 !==null ){
        resourceType1.innerHTML = tabOnline;
        if(tabOnline==""){
            resource1Tab.setAttribute("class", "d-none");
        }
    }
    if(resourceType2 !==null ){
        resourceType2.innerHTML = tabOffline;
        if(tabOffline==""){
            resource2Tab.setAttribute("class", "d-none");
        }
    }
    if(resourceType3 !==null ){
        resourceType3.innerHTML = tabArticle;
        if(tabArticle==""){
            resource3Tab.setAttribute("class", "d-none");
        }
    }
}

