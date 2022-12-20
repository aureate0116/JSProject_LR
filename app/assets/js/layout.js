const apiUrl="https://json-server-cyh3.onrender.com";

let localStorageUserId = localStorage.getItem("userId");
let localStorageUserToken = localStorage.getItem("accessToken");

const beforeLogin = document.querySelector('.beforeLogin');
const afterLogin = document.querySelector('.afterLogin');

const accountMenuImg = document.querySelector('.accountMenuImg');
const accountMenu = document.querySelector('.accountMenu');

const logOut = document.querySelector('.logOut');




//如果有取得 userid  就表示有登入
if(localStorageUserId == null || localStorageUserId == "" ){
    if(afterLogin!==null){
        afterLogin.setAttribute("class","d-none");
    }
}else{
    if(beforeLogin!==null){
        beforeLogin.setAttribute("class","d-none");
    }
    let userData=[];
    axios.get(`${apiUrl}/users?id=${localStorageUserId}`,headers).then(res=>{
        userData=res.data;
        renderAccountMenu(userData);
       
    }).catch(err=>{
        if(err?.reponse?.status === 401){
            clearLocalStorage();
            test();
        }
        console.log(err);
    })
}


//隱藏登入註冊, 顯示會員功能, 帶入相關會員資訊 , 切換至會員頁時帶入會員 id 資料等
//將 userid 渲染至選單連結中
function renderAccountMenu(userData){
    if(userData.length!=0){
        let prefix = (userData[0].firstName)[0].toUpperCase();
    
        let accountMenuImgStr=`
        <span class="userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center">${prefix}</span>`;
        let accountMenuStr=`<li><a class="dropdown-item" href="./acc_profile.html?userid=${localStorageUserId}">個人資料</a></li>
        <li><a class="dropdown-item" href="./acc_resources.html?userid=${localStorageUserId}">我的資源</a></li>
        <li><a class="dropdown-item" href="#">我的募集</a></li>
        <li><a class="dropdown-item" href="#">我的學習</a></li>
        <li><a class="dropdown-item" href="#">設定</a></li>`;
    
        accountMenuImg.innerHTML=accountMenuImgStr;
        accountMenu.innerHTML=accountMenuStr;

    }
}


//如果登出,就清空 localStorage userId
logOut.addEventListener("click",e=>{
    localStorage.setItem('accessToken', "");
    localStorage.setItem('userId',"");
    if(beforeLogin!==null){
            beforeLogin.setAttribute("class","d-block");
    }
    if(afterLogin!==null){
        afterLogin.setAttribute("class","d-none");
    }
    location.href = "./index.html";
    //location.reload();
})

