const apiUrl="https://json-server-cyh3.onrender.com";

let resId = parseFloat(location.href.split("=")[1]);
let headers = {
    headers:{
        "authorization": `Bearer ${localStorageToken}` 
    }
}

function initResourcePage(){
    getResourcesForResources();
    getCommentData();
    getResourcesItem(resId);
    getResourcesComment(resId);

    getUserData();
    getbookmarkData();
    //submitComment();
}
initResourcePage();

let resourcesData = [];
let commentsData = [];

// 取得所有資源資料
function getResourcesForResources(){
  axios.get(`${apiUrl}/resources`)
  .then(res=>{
    resourcesData = res.data; 
  }).catch(error=>{
    console.log(error);
  })
}

function getCommentData(){
  axios.get(`${apiUrl}/comments`)
  .then(res=>{
    commentsData = res.data; 
    renderRelatedResource();
  }).catch(error=>{
    console.log(error);
    
  })
}


let resourceContent=[];
let resourceCommentData=[];

//取得單一資源
function getResourcesItem(id){
    axios.get(`${apiUrl}/resources?id=${id}&_expand=user`)
    .then(res=>{
        resourceContent = res.data;
        renderResource();
        renderRelatedResource();
    
    }).catch(error=>{
      console.log(error);
    })
}
function getResourcesComment(id){
    axios.get(`${apiUrl}/comments?_expand=resouceId&&resourceId=${id}&&_expand=user`)
    .then(res=>{
        resourceCommentData = res.data;
        renderResource();
        renderComment();
        submitComment();

    }).catch(error=>{
      console.log(error);
    })
}

/******************資源資訊***********************/

const imageNBrief = document.querySelector('.imageNBrief');
const titleBox = document.querySelector('.titleBox');
const btnResLink = document.querySelector('.btnResLink');


function renderResource(){

    let renderItem=resourceContent[0];
    let userName ="";

    if(renderItem!==undefined){
        document.title = renderItem.title;
        if( renderItem.user.role==="admin"){
            userName = "admin"
        }else{
            userName =`${renderItem.user.lastName} ${renderItem.user.firstName} `;
        }

        let commentScoreNum = getAverageScore();
        let resultScore = commentScoreNum[0];
        let commentNum = commentScoreNum[1];
        let starStr = combineCommentStar(resultScore);

        let imageNBriefStr="";
        let titleBoxStr="";
        let btnBoxStr="";

        if( renderItem.imgUrl ===""){
            renderItem.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
        }

        if(resultScore[resId]===undefined || starStr[resId]=== undefined ){
            titleBoxStr = `<h2 class="fs-5 fw-bold mt-md-0 mt-3">${renderItem.title}</h2>
            <div class="d-flex flex-wrap align-items-center text-secondary">
                <span class="fs-8 fw-bold me-lg-2">尚無評價</span>
            </div>
            <div class="classify fs-7">
                <ul class="d-flex ">
                    <li class="me-2">  ${renderItem.topics}</li>
                    <li class="me-2">  ${renderItem.type}</li>
                    <li class="me-2">  ${renderItem.level}</li>
                    <li class="me-2">  ${renderItem.price}</li>
                </ul>
                <ul>
                    <li class="me-2">  ${renderItem.lang} </li>
                    <li class="me-2">建立者 : ${userName} </li>
                </ul>
            </div>`;
        }else{
            titleBoxStr = `<h2 class="fs-5 fw-bold mt-md-0 mt-3">${renderItem.title}</h2>
            <div class="d-flex flex-wrap align-items-center text-secondary">
                <span class="fs-5 fw-bold me-lg-2"> ${resultScore[resId]}</span>
                <ul class="d-flex align-items-center lh-1 me-lg-2">
                ${starStr[resId]}
                </ul>                                
                <span class="fs-8">(${commentNum[resId]})</span>
            </div>
            <div class="classify fs-7">
                <ul class="d-flex ">
                    <li class="me-2">  ${renderItem.topics}</li>
                    <li class="me-2">  ${renderItem.type}</li>
                    <li class="me-2">  ${renderItem.level}</li>
                    <li class="me-2">  ${renderItem.price}</li>
                </ul>
                <ul>
                    <li class="me-2">  ${renderItem.lang} </li>
                    <li class="me-2">建立者 : ${userName} </li>
                </ul>
            </div>`;
        }

        
        btnBoxStr = `
        <a href="${renderItem.url}" type="button" target="_blank" class="btn btn-secondary my-2 text-white px-lg-4 py-2 fs-6 w-100">前往資源</a>`;

        imageNBriefStr = `
        <img class="d-md-block" src="${renderItem.imgUrl}" alt="${renderItem.title}">
                    <div class="mt-md-3 text-dark">${renderItem.intro}</div>`;
        
        
        if(imageNBrief!==null){
            imageNBrief.innerHTML = imageNBriefStr;
        }
        if(titleBox!==null){
            titleBox.innerHTML = titleBoxStr;
        }
        if(btnResLink!==null){
            btnResLink.innerHTML = btnBoxStr;
        }

    }
   
}


/******************資源評論***********************/

const commentList=document.querySelector('.resourceComment > .commentList');
const commentSort=document.querySelector('#commentSort');


function renderComment(){

    let commentStr="";
    let userName ="";
    // console.log(resourceCommentData)

    if(resourceCommentData.length===0){
        const btnReadMore = document.querySelector('.btnReadMore');
        if(btnReadMore!==null){
            btnReadMore.setAttribute("class","d-none");
        }
    }
    //let resultScore = getAverageScore();
    let commentNum = 0;
    resourceCommentData.forEach(item=>{
        let resultScore = {
            "1":`${item.score}`
        };
        let newResultScoreOjb = combineCommentStar(resultScore);

        if(item.user.role==="admin"){
            userName = "admin"
        }else{
            userName =`${item.user.firstName} ${item.user.lastName}`;
        }

        let prefix = (item.user.firstName)[0].toUpperCase();
        let commentTimeAge = Ftime(item.commentTime);
        commentStr+=`
        <div class="col mb-3 position-relatvie" style="z-index:10;">
            <div class="card card-body position-relatvie d-flex justify-content-between" style="z-index:10;">
                <div class="d-flex align-items-lg-center flex-column flex-lg-row justify-content-between"> 
                    <h3 class="card-title fs-7 d-flex align-items-center justify-content-lg-start justify-content-between">

                        <span class="userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center">${prefix}</span>

                        <p class="mb-0 mx-2 text-start">
                            ${userName}<br/>
                            <span class="fs-9 text-gray">${item.user.title}</span>
                        </p>
                        
                    </h3>
                    <div class="d-flex flex-lg-column justify-content-between">
                        <ul class="card-text d-flex align-items-center lh-1">
                        ${newResultScoreOjb[1]}
                        
                        </ul> 
                        <p class="mb-0 text-end">
                            <span class="fs-9 text-gray">${commentTimeAge}</span></p>
                    </div>
                </div>

                <div class="d-flex flex-column">
                    <div class="form-floating my-3"> 
                        <p>${item.content}</p>
                    </div>
                </div>

                <div class="d-flex justify-content-between fs-8">
                    <!-- like & dislike -->
                    <div class="d-flex align-items-center">
                        <a href="#">
                            <span class="material-icons-outlined fs-6">thumb_up_alt</span></a>
                        <span class="mx-2">${item.likeNum}</span>
                        <!-- <a href="#">
                        <span class="material-icons fs-6">thumb_up_alt</span></a> -->

                            <a href="#">
                            <span class="material-icons-outlined fs-6">thumb_down_alt</span></a>
                            <span class="mx-2">${item.dislikeNum}</span>
                            <!-- <a href="#">
                            <span class="material-icons fs-6">thumb_down_alt</span></a> -->

                    </div>

                    <div class="position-relatvie" >
                        <a class="d-flex align-items-center" data-bs-toggle="collapse" href="#commentOffense${commentNum+1}" role="button" aria-expanded="false" aria-controls="commentOffense">
                            <span class="material-icons-outlined">report</span>
                            <span>檢舉</span>
                        </a>

                        <div class="offenseItem border bg-light rounded-3 p-3 collapse position-absolute end-0" id="commentOffense${commentNum+1}" style="z-index:0;">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="offenseItem" id="offenseItem1">
                                <label class="form-check-label" for="offenseItem1">
                                    偏離主題
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="offenseItem" id="offenseItem2">
                                <label class="form-check-label" for="offenseItem2">
                                    垃圾內容及廣告宣傳
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="offenseItem" id="offenseItem3">
                                <label class="form-check-label" for="offenseItem3">
                                    騷擾內容及不雅用語
                                </label>
                            </div>
                            <button class="btn btn-primary btn-sm text-white" type="submit">送出</button>
                        </div>
                    </div>
                </div>
            </div><!--end card-->
        </div>`;

        commentNum +=1;

    })

    if(commentList!==null){
         commentList.innerHTML = commentStr;
    }
    if(commentStr==""){
        if(commentSort!==null){
            commentSort.setAttribute("class","d-none");
            commentList.innerHTML = `<div class="text-center">目前尚無評論，歡迎您留言分享寶貴的經驗唷!</div>`;
        }

    }

}


/******************相關資源***********************/

const relatedResource = document.querySelector('.relatedResource');
const relatedTitle = document.querySelector('h3.relatedTitle');


function renderRelatedResource(){
    let relatedStr="";
    let renderNum = 1;

    let commentScoreNum = getAverageScore();
    let resultScore = commentScoreNum[0];
    let commentNum = commentScoreNum[1];
    let starStr = combineCommentStar(resultScore);
    
    if(resourcesData!==undefined){
        resourcesData.forEach(resItem=>{
        // let resultScore = getAverageScore();
        // let newResultScoreOjb = combineCommentStar(resultScore);

        if(resourceContent.length!==0){
            //console.log(resourceContent);
            if(resItem.topics === resourceContent[0].topics 
                && resItem.id !== resourceContent[0].id){
                renderNum +=1;   
                if(renderNum <=5 ){
                    if(resultScore[resItem.id]==undefined||starStr[resItem.id]==undefined || commentNum[resItem.id] == undefined){
                        relatedStr+=`
                        <div class="my-4">
                        <h4 class="fs-7"><a href="./resource.html?id=${resItem.id}" > ${resItem.title}</a></h4>
                            <div class="d-flex flex-wrap justify-content-start align-items-center">
                                <span class="fs-8 text-gray me-lg-2">尚無評價</span>                           
                            </div>
                        </div>
                        `;
                    }else{
                        relatedStr+=`
                        <div class="my-4">
                        <h4 class="fs-7"><a href="./resource.html?id=${resItem.id}"> ${resItem.title}</a></h4>
                        <div class="d-flex flex-wrap justify-content-start align-items-center text-secondary">
                            <span class="fs-7 fw-bold me-lg-2">${resultScore[resItem.id]}</span>
                            <ul class="d-flex align-items-center lh-1 me-lg-2 ">
                            ${starStr[resItem.id]}
                            </ul>   
                            <span class="fs-8">(${commentNum[resItem.id]})</span>                             
                        </div>
                        </div>
                        `;
                    }
                
                    
                } 
            }
        }
        
        
        })
    }
    

    if(relatedResource!==null){
        relatedResource.innerHTML = relatedStr;
    }
    if(relatedTitle!==null){
        if(relatedStr==""){
            relatedTitle.setAttribute("class","d-none");
        }
    }
}


/******************立即評論***********************/

const btnComment = document.querySelector('.btnComment');
const commentContent = document.querySelector('.commentContent');
const userInfo = document.querySelector('h3.userInfo');
const btnCommentSubmit = document.querySelector('.btnCommentSubmit');

const commentStar = document.querySelectorAll('.commentStar > li > a >span');
const commentTextarea = document.querySelector('#commentTextarea');
const btnBookmark = document.querySelector('.btnBookmark');


//取得該用戶資料
let localStorageUserId = localStorage.getItem("userId");  
let localStorageToken = localStorage.getItem("accessToken");

let userData=[];
// document.querySelector("body").setAttribute("style","overflow-y:hidden");

function getUserData(){
    axios.get(`${apiUrl}/users?id=${localStorageUserId}`)
    .then(res=>{
        userData = res.data;
        renderBtnCommentContent();
  
    }).catch(error=>{
        if(error?.response?.status==401){
            clearLocalStorage();
        }
      console.log(error);
    })
}

let userBookmark;
function getbookmarkData(){
    axios.get(`${apiUrl}/bookmarks?userId=${localStorageUserId}`)
    .then(res=>{
        userBookmark = res.data;        
        renderBookmark();
  
    }).catch(error=>{
        console.log(error);
        if(error?.response?.status==401){
            clearLocalStorage();
        }
        
    })
}

//渲染按鈕 //更新 collapseComment   判斷是否有"收藏"
function renderBtnCommentContent(){
    //console.log(localStorageUserId,localStorageToken);
    if(btnComment!==null){
        btnComment.setAttribute("href",`#collapseComment${resId}`);
        btnComment.setAttribute("aria-controls",`collapseComment${resId}`);
    }
    if(commentContent!==null){
        commentContent.setAttribute("id",`collapseComment${resId}`);
    }

    // console.log("resId");
    // console.log(resId);

    //如果有登入
    let userInfoStr="";
    if(localStorageUserId !=="" && localStorageUserId !== null){
        let prefix = (userData[0].firstName)[0].toUpperCase();
        
        userInfoStr=`
        <span class="userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center">${prefix}</span>
        <p class="mb-0 mx-2 text-start">
            ${userData[0].firstName} ${userData[0].lastName}<br/>
            <span class="fs-9 text-gray">${userData[0].title}</span>

        </p>`;

        if(userInfo!==null){
            userInfo.innerHTML = userInfoStr;
        }

    }else{
        if(commentContent!==null){
           commentContent.setAttribute("class","d-none");

        }
        if(btnComment!==null){
            btnComment.setAttribute("href",``); 
            btnComment.addEventListener("click",e=>{
            //alert("請先登入");
                Swal.fire({
                    text:`請先登入`,
                    icon: 'info',
                    iconColor:"#4AA9B6",            
                    confirmButtonColor:"#4AA9B6",   
                })
            //location.href="./login.html"
            })
        }
    }
}

function renderBookmark(){
    if(localStorageUserId !=="" && localStorageUserId !== null){
        //console.log(resId);
        
        let result = userBookmark.filter(item=>{
            return item.resourceId == resId;
        }) 
        //console.log(result);

        if(result.length!==0){
            if(btnBookmark!==null){
                btnBookmark.innerHTML = `<span class="material-icons text-secondary">bookmark</span>
                <span class="text-secondary">收藏</span>`;
            }
        }
        
        if(btnBookmark!=null){
            btnBookmark.addEventListener("click",e=>{
                //如果已收藏 會取消收藏 delete bookmarks
                if(result.length!==0){
                    //console.log(result[0].id);
                    axios.delete(`${apiUrl}/bookmarks/${result[0].id}`,headers)
                    .then(res=>{
                        btnBookmark.innerHTML = `<span class="material-icons">bookmark_border</span>
                        <span>收藏</span>`;
                    
                        location.reload();
                    }).catch(err=>{
                        if (err?.response?.status === 401) {
                            clearLocalStorage();
                        };
                        console.log(err);
                    })      
                }else if(result.length == 0){ //如果尚未收藏  會加入收藏  post bookmarks
                    axios.post(`${apiUrl}/600/bookmarks?userId=${localStorageUserId}`,{  
                        "resourceId": resId,
                        "userId": localStorageUserId,
                        "isFixedTop": false
                    },headers)
                    .then(res=>{
                        btnBookmark.innerHTML = `<span class="material-icons text-secondary">bookmark</span>
                        <span class="text-secondary">收藏</span>`;
                        location.reload();
                        //console.log(res.data);
                    }).catch(err=>{
                        console.log(err);
                        if (err?.response?.status === 401) {
                            clearLocalStorage();
                        };
                    })
                }
            })
        }
    }else{
        if(btnBookmark!=null){
            btnBookmark.addEventListener("click",e=>{
                //alert("請先登入");
                Swal.fire({
                    text:`請先登入`,
                    icon: 'info',
                    iconColor:"#4AA9B6",            
                    confirmButtonColor:"#4AA9B6",   
                    // showConfirmButton: false,
                    timer: 1500
                })
                // location.href="./login.html";
                //setTimeout("location.href='./login.html'",4000);
            })

        }
    }
}

let thisTime = ((Date.now())/1000).toFixed(0);
// console.log("thisTime");
// console.log(thisTime);

let starNum = 0;
//checked 星星
// console.log(commentStar);
commentStar.forEach((starItem,index)=>{
    starItem.addEventListener("click",e=>{
        
        for(let i=0 ; i<= commentStar.length-1 ; i++){
            commentStar[i].textContent = "star_outline"
            starNum =0;
        }

        for(let i=0 ; i<= index ; i++){
            commentStar[i].textContent = "star";
            starNum +=1;
        }
        // console.log("starNum");
        // console.log(starNum);

    })
  
})

//檢查留言字數
if(commentTextarea!==null){
    commentTextarea.addEventListener("change",e=>{
        if( commentTextarea.value.length < 20){
            document.querySelector('.commentTextarea').textContent ="字數須超過20字"
            return;
        }else{
            document.querySelector('.commentTextarea').textContent ="";
        }
    
    })
}

//送出評論, 要更新總評分
function submitComment(){
    // console.log("resourceCommentData");
    // console.log(resourceCommentData);
    let totalScore = 0;
    resourceCommentData.forEach(item=>{
        totalScore += item.score;
    })
    let thisResAverageScore = totalScore/resourceCommentData.length;
    // console.log("thisResAverageScore");
    // console.log(thisResAverageScore);


    if(btnCommentSubmit!=null){
    btnCommentSubmit.addEventListener("click",e=>{
        if(commentTextarea.value=="" ){
            Swal.fire({
                text:"請填寫評價內容",
                icon: 'info',
                iconColor:"#4AA9B6", 
                confirmButtonColor:"#4AA9B6",       
                showConfirmButton: true,
            })
        }
        if(starNum==0 ){
            Swal.fire({
                text:"請給予評分",
                icon: 'info',
                iconColor:"#4AA9B6", 
                confirmButtonColor:"#4AA9B6",       
                showConfirmButton: true,
            })
        }
        
        if(commentTextarea.value!=="" && commentTextarea.value.length >= 20 && starNum!==0){
            axios.post(`${apiUrl}/600/comments/`,{
                "resourceId": resId,
                "userId": localStorageUserId,
                "commentTime": thisTime,
                "score": starNum,
                "content": commentTextarea.value,
                "likeNum": 0,
                "dislikeNum": 0
            },headers).then(res=>{
    
                let newAverageScore ;
                if(thisResAverageScore == NaN || resourceCommentData.length==0){
                    newAverageScore = starNum;
                }else{
                    newAverageScore = ((thisResAverageScore*resourceCommentData.length)+starNum)/(resourceCommentData.length+1).toFixed(1);
                } 
                axios.patch(`${apiUrl}/resources/${resId}`,{
                    "averageScore":newAverageScore
                })
                .then(res=>{
                    console.log(res.data);
                }).catch(err=>{
                    console.log(err);
                })
    
                location.reload();
    
    
            }).catch(err=>{
                console.log(err);
                if (err?.response?.status === 401) {
                    clearLocalStorage();
                };
            })
        }

        
    
    })
    }
}





/******************收藏資源***********************/
