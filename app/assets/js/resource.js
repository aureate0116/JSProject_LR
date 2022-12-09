
let resId = location.href.split("=")[1];


function initResourcePage(){
    getResourcesItem(resId);
    getResourcesComment(resId);
}
initResourcePage();


/******************資源資訊***********************/
let resourceContent;
function getResourcesItem(id){
    axios.get(`${url}/resources?id=${id}&_expand=user`)
    .then(res=>{
        resourceContent = res.data;
        // console.log("resourceContent");
        // console.log(resourceContent);
        renderResource();

    
    }).catch(error=>{
      console.log(error);
    })
}


const imageNBrief = document.querySelector('.imageNBrief');
const titleBox = document.querySelector('.titleBox');
const btnBox = document.querySelector('.btnBox');

function renderResource(){
    let renderItem=resourceContent[0];
    let userName ="";
    //console.log(item.user.role);

    if(renderItem!==undefined){
        if( renderItem.user.role==="admin"){
            userName = "admin"
        }else{
            userName =`${renderItem.user.lastName} ${renderItem.user.firstName} `;
        }

        let resultScore = getAverageScore();
        let newResultScoreOjb = combineCommentStar(resultScore);

        let imageNBriefStr="";
        let titleBoxStr="";
        let btnBoxStr="";

        if(resultScore[resId]===undefined || newResultScoreOjb[renderItem.resId]=== undefined || resourceIdObj[resId]=== undefined ){
            titleBoxStr = `<h2 class="fs-5 fw-bold mt-md-0 mt-3">${renderItem.title}</h2>
            <div class="d-flex flex-wrap align-items-center text-secondary">
                <span class="fs-8 fw-bold me-lg-2">尚無評價</span>
            </div>
            <div class="classify fs-7">
                <ul class="d-flex ">
                    <li class="me-2">  ${renderItem.topics}</li>
                    <li class="me-2">  ${renderItem.classify.type}</li>
                    <li class="me-2">  ${renderItem.classify.level}</li>
                    <li class="me-2">  ${renderItem.classify.price}</li>
                </ul>
                <ul>
                    <li class="me-2">  ${renderItem.classify.lang} </li>
                    <li class="me-2">建立者 : ${userName} </li>
                </ul>
            </div>`;
        }else{
            titleBoxStr = `<h2 class="fs-5 fw-bold mt-md-0 mt-3">${renderItem.title}</h2>
            <div class="d-flex flex-wrap align-items-center text-secondary">
                <span class="fs-5 fw-bold me-lg-2"> ${resultScore[resId]}</span>
                <ul class="d-flex align-items-center lh-1 me-lg-2">
                ${newResultScoreOjb[renderItem.resId]}
                </ul>                                
                <span class="fs-8">(${resourceIdObj[resId]})</span>
            </div>
            <div class="classify fs-7">
                <ul class="d-flex ">
                    <li class="me-2">  ${renderItem.topics}</li>
                    <li class="me-2">  ${renderItem.classify.type}</li>
                    <li class="me-2">  ${renderItem.classify.level}</li>
                    <li class="me-2">  ${renderItem.classify.price}</li>
                </ul>
                <ul>
                    <li class="me-2">  ${renderItem.classify.lang} </li>
                    <li class="me-2">建立者 : ${userName} </li>
                </ul>
            </div>`;
        }


        btnBoxStr = `
        <button type="button" class="btn btn-sm btn-secondary my-2 text-white px-lg-4 py-2 fs-6">前往資源</button>
        <div class="d-flex justify-content-center flex-row flex-md-column flex-lg-row align-items-center">                    
            <a href="#" role="button" class="d-flex align-items-center me-2 ">
                <span class="material-icons ">bookmark_border</span>
                <!-- <span class="material-icons">bookmark</span> -->
                <span>收藏</span>
            </a>

            <a href="#" role="button" class=" d-flex align-items-center me-2 ">
                <span class="material-icons material-icons-outlined">feedback</span>
                <!-- <span class="material-icons">feedback</span> -->
                <span>回報</span>
            </a>
        </div>`;

        imageNBriefStr = `
        <img class="d-md-block d-none" src="${renderItem.imgUrl}" alt="${renderItem.title}">
                    <div class="mt-md-3 text-dark">${renderItem.intro}</div>`;
        
        
        if(imageNBrief!==null){
            imageNBrief.innerHTML = imageNBriefStr;
        }
        if(titleBox!==null){
            titleBox.innerHTML = titleBoxStr;
        }
        if(btnBox!==null){
            btnBox.innerHTML = btnBoxStr;
        }

    }
   
    

}



/******************資源評論***********************/

const commentList=document.querySelector('.resourceComment > .commentList');

let resourceCommentData=[];
function getResourcesComment(id){
    axios.get(`${url}/comments?_expand=resouceId&&resourceId=${id}&&_expand=user`)
    .then(res=>{
        resourceCommentData = res.data;
        console.log("resourceCommentData");
        console.log(resourceCommentData);
        renderComment();

    
    }).catch(error=>{
      console.log(error);
    })
}


function renderComment(){

    let commentStr="";
    let userName ="";
    //let resultScore = getAverageScore();
   

    resourceCommentData.forEach(item=>{
        let resultScore = {
            "1":`${item.score}`
        };
        let newResultScoreOjb = combineCommentStar(resultScore);

        if(item.user.role==="admin"){
            userName = "admin"
        }else{
            userName =`${item.user.lastName} ${item.user.firstName} `;
        }

        let commentTimeAge = Ftime(item.commentTime);
        commentStr+=`
        <div class="col mb-3 position-relatvie" style="z-index:10;">
            <div class="card card-body position-relatvie" style="z-index:10;">
                <div class="d-flex p-lg-3 align-items-lg-center flex-column flex-lg-row justify-content-between"> 
                    <h3 class="card-title fs-7 d-flex align-items-center justify-content-lg-start justify-content-between">
                        <img class="rounded-circle" src="./assets/images/icon_image.png" alt="">
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
                        <a class="d-flex align-items-center" data-bs-toggle="collapse" href="#commentOffense1" role="button" aria-expanded="false" aria-controls="commentOffense">
                            <span class="material-icons-outlined">report</span>
                            <span>檢舉</span>
                        </a>

                        <div class="offenseItem border bg-light rounded-3 p-3 collapse position-absolute end-0" id="commentOffense1" style="z-index:0;">
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
        </div><!--end col-->`;


    })

    if(commentList!==null){
         commentList.innerHTML = commentStr;
    }
   

}



/******************相關資源***********************/