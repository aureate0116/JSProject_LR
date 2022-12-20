const apiUrl="https://json-server-vercel-ochre.vercel.app";

function initAccountResources(){
    getAccountUserData();
    getAccountBookmarkData();
    
}
initAccountResources();

const userResourcesList = document.querySelector('.userResourcesList');

//取得用戶資料
let localStorageUserId = localStorage.getItem("userId");  
let localStorageToken = localStorage.getItem("accessToken");

// document.querySelector("body").setAttribute("style","overflow-y:hidden");

let userData=[];
function getAccountUserData(){
    axios.get(`${apiUrl}/users?id=${localStorageUserId}`)
    .then(res=>{
        userData = res.data;
        document.title ="我的資源";
        renderUserResList();
  
    }).catch(err=>{
        if (err?.response?.status === 403) {
            document.location.href = `/acc_resources.html?userid=${localStorageUserId}`;
        } else if (err?.response?.status === 401) {
            clearLocalStorage();
        };
      console.log(err);
    })
}

//取得收藏資料
let userBookmark=[];
function getAccountBookmarkData(){
    axios.get(`https://json-server-vercel-ochre.vercel.app/bookmarks?_expand=resource&&userId=${localStorageUserId}`)
    .then(res=>{
        userBookmark = res.data;
        renderUserResList();
  
    }).catch(error=>{
        console.log(error);
        if (err?.reponse?.status == 403) {
            document.location.href = `./acc_account.html?userid=${localStorageUserId}`;
        } else if (err?.response?.status == 401) {
            clearLocalStorage();
        };
        
    })
}


function renderUserResList(){
    let resItemStr="";

    if(userBookmark.length!=0){
        userBookmark.forEach(item=>{
            console.log(userBookmark);
            let score;
            if(item?.resource?.averageScore !== undefined){
                score = item?.resource?.averageScore ;
            }else{
                score = 0;
            }
            //console.log(score,item.id);
            let starStr="";
            if(score!==0){
                starStr = combineCommentStarbyScore(score);
            }
            //console.log(starStr);
            resItemStr += combineResRow(item,starStr);
        })    
        if(userResourcesList!=null){
            userResourcesList.innerHTML = resItemStr;
        }
    }else{
        if(userResourcesList!=null){
            userResourcesList.innerHTML = `<div class="row">
            <div class="col text-center py-6 text-gray">您目前沒有收藏的資源</div></div> `;
        }
    }
}

function combineResRow(item,starStr){
    //console.log(item.resource["averageScore"]);
    if( item.resource.imgUrl == ""){item.resource.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";}

    if(starStr =="" || starStr == undefined){
        return `
        <div class="row my-3 d-flex align-items-center itemRow">
            <div class="col-1 d-none d-xl-block"></div>
            <div class="col-2 col-md-1 d-flex justify-content-center">
                <span class="material-icons-outlined fs-7 text-yellowBrown">push_pin</span>
                <!-- <span class="material-icons">push_pin</span> -->
            </div>

            <div class="col-1 d-none d-md-block">
                <a href="./resource.html?id=${item.resource.id}"><img src="${item.resource.imgUrl}" alt=""></a>
            </div>
            <div class="col-xl-4 col-4 col-md-5 ">
                <h4 class="fs-7"><a href="./resource.html?id=${item.resource.id}"> ${item.resource.title}</a></h4>
                <div class="d-flex flex-wrap align-items-center">
                    <span class="fs-8 fw-bold text-gray me-lg-2">尚無評論</span>
                </div>
            </div>
            <div class="col-xl-4 col-6 col-md-5 ">
                <div class="d-flex align-items-center justify-content-center flex-wrap">
                    <a href="${item.resource.url}" target="_blank" type="button" class="btn btn-tiffany my-2 mx-1 ">前往資源</a>
                    <a href="./resource.html?id=${item.resource.id}" type="button" class="btn btn-yellowBrown my-2  mx-1">查看介紹</a>
                    <div>
                    <a role="button" class=" btn my-2 mx-1 text-yellowBrown" >
                        <span class="fs-6 material-icons btnRemove" data-markId="${item.id}">bookmark_remove</span></a>

                   
                    </div>    
                </div>
            </div>
            <div class="col-1 d-none d-xl-block"></div>
        </div>`;
    }else{
        return `
        <div class="row my-3 d-flex align-items-center itemRow">
            <div class="col-1 d-none d-xl-block"></div>
            <div class="col-2 col-md-1 d-flex justify-content-center">
                <span class="material-icons-outlined fs-7 text-yellowBrown">push_pin</span>
                <!-- <span class="material-icons">push_pin</span> -->
            </div>
            <div class="col-1 d-none d-md-block">
                <a href="./resource.html?id=${item.resource.id}"><img src="${item.resource.imgUrl}" alt=""></a>
            </div>
            <div class="col-xl-4 col-4 col-md-5 ">
                <h4 class="fs-7"><a href="./resource.html?id=${item.resource.id}"> ${item.resource.title}</a></h4>
                <div class="d-flex flex-wrap align-items-center text-secondary">
                    <span class="fs-7 fw-bold me-lg-2"> ${(item.resource["averageScore"]).toFixed(1)}</span>
                    <ul class="d-flex align-items-center lh-1 me-lg-2">
                        ${starStr}
                    </ul>                                
                </div>
            </div>
            <div class="col-xl-4 col-6 col-md-5 ">
                <div class="d-flex align-items-center justify-content-center flex-wrap">
                    <a href="${item.resource.url}" type="button" class="btn btn-tiffany my-2 mx-1 ">前往資源</a>
                    <a href="./resource.html?id=${item.resource.id}" type="button" class="btn btn-yellowBrown my-2  mx-1">查看評論</a>
                    <div>
                    <a  role="button" class="btn my-2 mx-1 text-yellowBrown">
                    <span class="fs-6 material-icons btnRemove" data-markId="${item.id}">bookmark_remove</span></a>  
                   
                    </div>    
                </div>
            </div>
            <div class="col-1 d-none d-xl-block"></div>
        </div>`;

    }

}

//依分數組星星
function combineCommentStarbyScore(score){
    let starStr="";

    let scoreStr = score.toString();

    for(let i=1; i<=scoreStr[0]*1 ;i++){
      starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li>`;
    }
    
    //半顆星星+空星星  
    if(scoreStr[2]<=2 || scoreStr[2] == null){
      for(let i=1; i<=5-(scoreStr[0]*1) ;i++){
        starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li> `;
      }
      
    }else if(scoreStr[2]*1 >=3 && scoreStr[2]*1 <=7){
        starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_half</span></li>`;
        for(let i=1; i<=(5-scoreStr[0]-1) ;i++){
          starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
        }
    }else if(scoreStr[2]*1 >=8){
        starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li`;
      for(let i=1; i<=(5-(scoreStr[0]*1)-1) ;i++){
        starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
      }
    }
    return  starStr;
}


// const testButtonRemove = document.querySelector('.testButtonRemove');
if(userResourcesList!==null){
    userResourcesList.addEventListener("click",e=>{
        if(e.target.getAttribute("class")=="fs-6 material-icons btnRemove"){
            let bookmarkId = e.target.getAttribute("data-markId");
            //console.log("點擊到移除收藏按鈕")
            
            Swal.fire({
                title: '您確定要取消收藏嗎?',
                icon: 'warning',
                iconColor:"#F8B436",
                showCancelButton: true,
                confirmButtonColor: '#4AA9B6',
                cancelButtonColor: '#F8B436',
                confirmButtonText: '是',
                cancelButtonText: '否'
              }).then((result) => {

                 if(result.isConfirmed) {   
                    axios.delete(`https://json-server-vercel-ochre.vercel.app/bookmarks/${bookmarkId}`,headers)
                    .then(res=>{
                        Swal.fire({
                            title:'已成功取消收藏',
                            confirmButtonColor: '#4AA9B6',
                        }) 
                        location.reload();   
                        console.log(res.data);
                    }).catch(err=>{
                            if (err.request.status === 403) {
                                document.location.href = `./acc_account.html?userid=${localStorageUserId}`;
                            } else if (err?.response?.status === 401) {
                                clearLocalStorage();
                            };
                        console.log(err);
                    })   
                }
                
              }).catch(err=>{
                console.log(err);
              })

        }
    })
}
   
