let locationHref = location.href.split("/");
let resTopic = location.href.split("=")[1];
let resId = location.href.split("=")[1];
let userId = location.href.split("=")[1];
let localStorageUserId = localStorage.getItem("userId");  
let pageClassify = locationHref[3].split(".html")[0];
let homePage = locationHref[0]+`//`+locationHref[2];

// let resTopicNew = resTopic.split(" ");
// console.log(resTopic);
// console.log("pageClassify",pageClassify);
// console.log("locationHref",locationHref);

//1. 頁面初始化
function initIndex(){
    getResourcesForIndex();
    if(pageClassify=="resource"){
        if(resId == undefined){
            location.href = `./index.html`;
        }
    }
    else if(pageClassify=="resource_list"){
        if(resTopic == undefined){
            location.href = `./index.html`;
        }
    }
    
    
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


let resourcesData = [];
let commentsData = [];

//取得資源資料
function getResourcesForIndex(){
  axios.get(`${url}/resources`)
  .then(res=>{
    resourcesData = res.data;
    document.title = "Eng!neer 程式學習資源網";
    renderGoodRateList();
    renderNewFreeList();
  
  }).catch(error=>{
    console.log(error);
  })
}

function getCommentForIndex(){
    axios.get(`${url}/comments`)
    .then(res=>{
      commentsData = res.data;
    
    }).catch(error=>{
      console.log(error);
    })
}

//渲染好評推薦資料
function renderGoodRateList(){
    let commentScoreNum = getAverageScore();
    let resultScore = commentScoreNum[0];
    let commentNum = commentScoreNum[1];
    let starStr = combineCommentStar(resultScore); 

    let itemNum1 = 0;
    let itemNum2 = 0;
    let itemNum3 = 0;
    let renderMaxNum = 6;
    let tabJS ="";
    let tabHtml="";
    let tabPython="";

    resourcesData.forEach( (item)=>{
        // console.log("resultScore");
        // console.log(resultScore);
        switch (item.topics){
            case "JavaScript" :
                if(itemNum1 <renderMaxNum){
                    tabJS += combineResouorceItemType1(item,resultScore,starStr,commentNum);
                   itemNum1 +=1;
                }
                break;

            case "HTML/CSS" :
                if(itemNum2 < renderMaxNum){
                    tabHtml += combineResouorceItemType1(item,resultScore,starStr,commentNum);
                    itemNum2+=1;
                }
                break;

            case "Python" :
                if(itemNum3 < renderMaxNum){
                     tabPython += combineResouorceItemType1(item,resultScore,starStr,commentNum);
                itemNum3+=1
                }
               
                break;
        }
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
function combineResouorceItemType1(item,resultScore,starStr,commentNum){

  if( item.imgUrl ===""){
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if(resultScore[item.id]===undefined || starStr[item.id]=== undefined || commentNum[item.id]=== undefined ){

    return  `
    <div class="col-md-6 col-lg-4">
    <div class="d-flex p-2 align-items-center">
        <div class="row">
            <div class="col-6"><a href="./resource.html?id=${item.id}" target="_blank"><img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"></a></div>
            
            <div class="col-6">
                <h4 class="ellipsis"><a href="./resource.html?id=${item.id}" target="_blank"> ${item.title}</a></h4>
                <div class="d-flex justify-content-between align-items-center">
                尚無評價
                </div>
            </div>
            
        </div>
         
        
    </div>
    </div>
    `;
  }else{
    return  `
    <div class="col-md-6 col-lg-4">
    <div class="d-flex p-2 align-items-center">
        <div class="row">
            <div class="col-6"><a href="./resource.html?id=${item.id}" target="_blank"><img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"></a></div>

            <div class="col-6">
                <h4 class="ellipsis"><a href="./resource.html?id=${item.id}" target="_blank"> ${item.title}</a></h4>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-6 fw-bold"> ${resultScore[item.id]}</span>
                    <ul class="d-flex align-items-center lh-1">
                    ${starStr[item.id]}
                    </ul>                                
                    <span class="fs-7">(${commentNum[item.id]})</span>
                </div>
            </div>
        </div>
        
    </div>
    </div>`;
  }
      
}

//渲染最新免費資源
function renderNewFreeList(){
    let commentScoreNum = getAverageScore();
    let resultScore = commentScoreNum[0];
    let commentNum = commentScoreNum[1];
    let starStr = combineCommentStar(resultScore);

    let tabOnline ="";
    let tabOffline="";
    let tabArticle="";

    resourcesData.forEach( (item)=>{
        if(item.price==="免費"){
            if(item.type==="線上課程"){
                tabOnline += combineResouorceItem(item,resultScore,starStr,commentNum);
            }

            if(item.type==="實體課程"){
                tabOffline += combineResouorceItem(item,resultScore,starStr,commentNum);
            }

            if(item.type==="文章"){
                tabArticle += combineResouorceItem(item,resultScore,starStr,commentNum);
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

