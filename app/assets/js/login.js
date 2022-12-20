
const apiUrl="https://json-server-cyh3.onrender.com";

const loginAccount = document.querySelector('#loginAccount');
const loginPw = document.querySelector('#loginPw');
const btnLogin = document.querySelector('#btnLogin');
// const signUpFormInputs = document.querySelectorAll('input.form-control');  //input


function initLogin(){
    getUserListbyLoginPage();
}
initLogin();


//取得用戶清單
let usersData = [];
function getUserListbyLoginPage(){
    axios.get(`https://json-server-cyh3.onrender.com/users`).then(res=>{
        usersData = res.data;
    }).catch(err=>{
        console.log(err);
        
    })
}

//欄位檢查

    if(document.querySelector("#loginAccount")!==null){
        document.querySelector("#loginAccount").addEventListener("change",e=>{
            document.querySelector('.account').textContent="";
            if(loginAccount.value==""){
                document.querySelector('.account').textContent="請輸入帳號";
            }else{
                document.querySelector('.account').textContent="";
            }
            
            let result = usersData.filter(userItem=>{
                return userItem.email === loginAccount.value;
            })
            // console.log("result");
            // console.log(result);
            if(result.length==0){
                document.querySelector('.account').textContent="此帳號不存在";
                
            }

           
            })
    }
    if(document.querySelector("#loginPw")!==null){
        document.querySelector("#loginPw").addEventListener("change",e=>{
            document.querySelector('.password').textContent="";
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

            axios.post("https://json-server-cyh3.onrender.com/login",{
                "email":loginAccount.value,
                "password":loginPw.value

            }).then(res=>{
                localStorage.setItem('accessToken', `${res.data.accessToken}`);
                localStorage.setItem('userId', res.data.user.id);
                location.href = "./index.html";

            }).catch(err=>{
                document.querySelector('.password').textContent="密碼錯誤";
                localStorage.clear();
                
            })

        }


    })
    }   



