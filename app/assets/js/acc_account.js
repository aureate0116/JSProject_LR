const apiUrl="https://json-server-cyh3.onrender.com";

let userId = location.href.split("=")[1];
let localStorageUserId = localStorage.getItem("userId");  
let localStorageToken = localStorage.getItem("accessToken");
// let pageClassify = location.href.split("/")[3].split(".html")[0];
let headers = {
    Authorization: `Bearer ${localStorageToken}` 
}
// let homePage = location.href.split("/")[0]+`//`+location.href.split("/")[2];

//如果localStorage userid 是空的 或是 該id 跟 這個page的id 不同 ，就轉跳至首頁
//取得該用戶資料
let userData=[];
function initAccount(){
    if(localStorageUserId == userId && localStorageUserId !==""){
        axios.get(`${apiUrl}/users?id=${localStorageUserId}`,headers)
        .then(res=>{
            userData = res.data;
            renderUserAccount();
        
        }).catch(err=>{
            if (err.request.status === 403) {
                document.location.href = `./acc_account.html?userid=${localStorageUserId}`;
            } else if (err.request.status === 401) {
                clearLocalStorage();
            };
            console.log(err);
        })
    }else{
        // if( location.href !== `${homePage}/index.html`){
        //     if( pageClassify!=="resource" && pageClassify!=="resource_list" 
        //     && location.href!==homePage+"/login.html"
        //     && location.href!==homePage+"/signup.html"
        //     && location.href!==homePage+"/acc_account.html"
        //     && location.href!==homePage+"/acc_resources.html"){
        //         location.href = `./index.html`;
        //     }
        // }
    }
}
initAccount();


//渲染既有資料
const userEmail = document.querySelector('#userEmail');
const userPW = document.querySelector('#userPW');

const leftMenu = document.querySelector('.leftMenu');


function renderUserAccount(){
    if(userEmail!=null){
        userEmail.value = userData[0].email;
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
    if(leftMenu!=null){
        leftMenu.innerHTML = leftMenuStr;
    }
}



const constraints ={
    oldPassowrd:{
        presence: {message: "必填欄位"},
        length: {
            minimum: 5, 
            message: "密碼長度請大於5"
        }
    },
    newPassword:{
        presence: {message: "必填欄位"},
        length: {
            minimum: 5, 
            message: "密碼長度請大於5"
        }
    },
    confirmpw:{
        presence: {message: "必填欄位"},
        equality:{
            attribute:"newPassword2",
            message: "與前者輸入密碼不同",
            // comparator: function(v1, v2) {
            //     return v1 === v2;
            //   }
        }
    }
}