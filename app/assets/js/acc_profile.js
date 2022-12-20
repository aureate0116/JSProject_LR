const apiUrl="https://json-server-vercel-ochre.vercel.app";

let userId = location.href.split("=")[1];
let localStorageUserId = localStorage.getItem("userId");  
let localStorageToken = localStorage.getItem("accessToken");
// let pageClassify = location.href.split("/")[3].split(".html")[0];
let headers = {
    headers:{
        "authorization": `Bearer ${localStorageToken}` 
    }
}
// let homePage = location.href.split("/")[0]+`//`+location.href.split("/")[2];

//如果localStorage userid 是空的 或是 該id 跟 這個page的id 不同 ，就轉跳至首頁
//取得該用戶資料
let userData=[];
function initProfile(){
    if(localStorageUserId == userId && localStorageUserId !==""){
        axios.get(`${apiUrl}/users?id=${localStorageUserId}`,headers)
        .then(res=>{
            userData = res.data;
            renderUserData();
        
        }).catch(err=>{
            //console.log(err);
            if (err?.response?.status === 403) {
                document.location.href = `./acc_resources.html?userid=${localStorageUserId}`;
            } else if (err?.response?.status === 401) {
                clearLocalStorage();
            };
        })
    }else{
        // if( location.href !== `${homePage}/index.html`){
        //     if( pageClassify!=="resource" && pageClassify!=="resource_list" 
        //     && location.href!==homePage+"/login.html"
        //     && location.href!==homePage+"/signup.html"
        //     && location.href!==homePage+"/acc_account.html"
        //     && location.href!==homePage+"/acc_resources.html"){
                
        //     }
        // }
        //location.href = `./index.html`;
    }
}
initProfile();


//渲染用戶既有資料

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const userTitle = document.querySelector('#userTitle');
const userExp = document.querySelector('#userExp');
// const websiteUrl = document.querySelector('#websiteUrl');
const profileImg = document.querySelector('.profileImg');

//左側選單
const leftMenu = document.querySelector('.leftMenu');

function renderUserData() {
    if(firstName!==null){
        firstName.value = userData[0].firstName;
    }
    if(lastName!==null){
        lastName.value = userData[0].lastName;
    }
   
    if(userData[0].title!=undefined){
        if(userTitle!==null){
            userTitle.value = userData[0].title;
        }
    }
    if(userData[0].experiences!=undefined){
        if(userExp!==null){
            userExp.value = userData[0].experiences;
        }
    }
    // if( userData[0].links.websiteUrl!=undefined){
    //     websiteUrl.value = userData[0].links.websiteUrl;
    // }

    // console.log(profileImg);
    let prefix = (userData[0].firstName)[0].toUpperCase();
    
    let profileImgStr=`
    <span class="userImg d-inline-block bg-primary p-4 rounded-circle fw-bold lh-1 text-white text-center">${prefix}</span>`;
    if(profileImg!==null){
        profileImg.innerHTML = profileImgStr;
    }


    let leftMenuStr=`<ul class="nav flex-row flex-lg-column">
        <li class="nav-item ">
        <a class="nav-link active ps-0 px-lg-3" aria-current="page" href="./acc_profile.html?userid=${localStorageUserId}">個人資料</a>
        </li>
        <li class="nav-item">
        <a class="nav-link ps-0 px-lg-3" href="./acc_account.html?userid=${localStorageUserId}">帳戶安全</a>
        </li>
        <!-- <li class="nav-item ps-0 px-lg-3">
        <a class="nav-link" href="#">通知</a>
        </li> -->
    </ul>  `;
    if(leftMenu!==null){
        leftMenu.innerHTML = leftMenuStr;
    }

}

//如果欄位編輯, 檢查欄位格式
const profileInputs = document.querySelectorAll('.profileInput');
if(profileInputs!==null){
    profileInputs.forEach(item=>{
        item.addEventListener("change",e=>{
            item.nextElementSibling.textContent = '';
            if(firstName.value ==""){
                document.querySelector('.firstName').textContent = '必填欄位';
            }
            if(lastName.value==""){
                document.querySelector('.lastName').textContent = '必填欄位';
            }
            if(userTitle.value.length > 15){
                document.querySelector('.userTitle').textContent = '字述請少於15';
            }
            // if(websiteUrl.value){
    
            // }
        })
    })
}



//上傳圖片

//儲存按鈕監聽,格式正確才儲存
const btnSaveProfile=document.querySelector('.btnSaveProfile');
if(btnSaveProfile!==null){
    btnSaveProfile.addEventListener("click",e=>{
        if(firstName.value !=="" && lastName.value!=="" && userTitle.value.length < 15){
               
            axios.patch(`https://json-server-vercel-ochre.vercel.app/600/users/${localStorageUserId}`,{
                "lastName" : lastName.value,
                "firstName" : firstName.value,
                "title" : userTitle.value,
                "experiences" : userExp.value,
            },headers)
            .then(res=>{
            
                Swal.fire({
                    text:"已成功更新",
                    icon: 'success',
                    iconColor:"#4AA9B6",        
                    showConfirmButton: false,
                    timer: 2000
                })
               
                //console.log(res.data);
            }).catch(err=>{
                if (err.request.status === 403) {
                    document.location.href = `./acc_profile.html?userid=${localStorageUserId}`;
                } else if (err?.response?.status === 401) {
                    clearLocalStorage();
                };
               
            })
           
        }
    })
}






