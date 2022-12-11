
const loginAccount = document.querySelector('#loginAccount');
const loginPw = document.querySelector('#loginPw');
const btnLogin = document.querySelector('#btnLogin');
// const signUpFormInputs = document.querySelectorAll('input.form-control');  //input


function initLogin(){
    getUserList();
}
initLogin();


//取得用戶清單
let usersData = [];
function getUserList(){
    axios.get("http://localhost:3000/users").then(res=>{
        usersData = res.data;
    }).catch(err=>{
        console.log(err.response);
    })
}

//欄位檢查
if(document.querySelector("#loginAccount")!==null){
    document.querySelector("#loginAccount").addEventListener("change",e=>{
    if(loginAccount.value==""){
        document.querySelector('.account').textContent="請輸入帳號";
    }else{
        document.querySelector('.account').textContent="";
    }
    usersData.forEach(userItem=>{
        if(userItem.email !==loginAccount.value){
            document.querySelector('.account').textContent="此帳號不存在";
        }else{
            document.querySelector('.account').textContent="";
        }
    })
})
}

if(document.querySelector("#loginPw")!==null){
    document.querySelector("#loginPw").addEventListener("change",e=>{
        if(loginPw.value==""){
            document.querySelector('.password').textContent="請輸入密碼";
        }else{
            document.querySelector('.password').textContent="";
        }
    })
}

if(btnLogin!==null){

    btnLogin.addEventListener("click",e=>{
    e.preventDefault();

        if(loginAccount.value===""||loginPw.value===""){
            return
        }

        if(document.querySelector('.account').textContent=="" && 
        document.querySelector('.password').textContent=="" ){

            axios.post("http://localhost:3000/login",{
                "email":loginAccount.value,
                "password":loginPw.value

            }).then(res=>{
                localStorage.setItem('accessToken', ` ${res.data.accessToken}`);
                localStorage.setItem('userId', res.data.user.id);
                location.href = "./index.html";

            }).catch(err=>{
                document.querySelector('.password').textContent="密碼錯誤";
                localStorage.clear();
            })

        }


})
}

