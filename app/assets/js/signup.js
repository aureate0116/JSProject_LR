const signUpForm = document.querySelector('form.signUpForm');  //form

const signupLastName = document.querySelector('#signupLastName');
const signupfirstName = document.querySelector('#signupfirstName');
const signupMail = document.querySelector('#signupMail');
const signupPw = document.querySelector('#signupPw');
const signupPwConfirm = document.querySelector('#signupPwConfirm');

const signUpFormInputs = document.querySelectorAll('input.signupInput');  //input
const btnSignUp = document.querySelector('#btnSignUp');

//console.log(signUpFormInputs);


function initSignup(){
    getUserList();
}
initSignup();



//驗證欄位內容
const constraints ={
    lastname:{
        presence: {message: "必填欄位"},
    },
    firstname:{
        presence: {message: "必填欄位"},
    },
    email:{
        presence: {message: "必填欄位"},
        email:{
            email:true,
            message: "請填寫正確的信箱格式"
        },
       
    },
    password:{
        presence: {message: "必填欄位"},
        length: {
            minimum: 5, 
            message: "密碼長度請大於5"
        }
    },
    confirmpw:{
        presence: {message: "必填欄位"},
        equality:{
            attribute:"password",
            message: "與前者輸入密碼不同",
            // comparator: function(v1, v2) {
            //     return v1 === v2;
            //   }
        }
    }
}


signUpFormInputs.forEach(item=>{
    item.addEventListener("change",e=>{
       
        item.nextElementSibling.textContent = '';
        let errors = validate(signUpForm, constraints);

        let result = usersData.filter(userItem=>{
            return userItem.email === signupMail.value;
        })

        if(result.length!==0){
            document.querySelector('.email').textContent="此帳號已存在";
        }else{
            document.querySelector('.email').textContent ="";
        }

    
        //有錯就呈現在畫面上
        if (errors) {
          Object.keys(errors).forEach( keys=> {
            //console.log(keys);
            document.querySelector(`.${keys}`).textContent = errors[keys][0].split(" ")[1];
          });
        }
    })
})



//取得用戶清單
let usersData = [];
function getUserList(){
    axios.get("http://localhost:3000/users").then(res=>{
        usersData = res.data
    }).catch(err=>{
        console.log(err.response);
    })
}


//註冊 post
if(btnSignUp!==null){
    btnSignUp.addEventListener("click",e=>{
    e.preventDefault();

    if(signupLastName.value===""||signupfirstName.value===""||signupMail.value===""||signupPw.value===""||signupPwConfirm.value===""){
        // console.log("有空欄位");
        return;
    }

    signUpFormInputs.forEach(item=>{
        if(item.nextElementSibling.textContent !== '' ){
            console.log("有錯誤訊息");
            return;
        }
    })

    if(signupPw.value!== signupPwConfirm.value){
        return;
    }

    axios.post("http://localhost:3000/users",{
        "lastName": signupLastName.value,
        "firstName": signupfirstName.value,
        "email": signupMail.value,
        "password": signupPw.value,
        "role": "user",
        "title":"",
        "experiences":"",
        "links":{"websiteUrl":""}

    }).then(res=>{
        console.log(res.data);
        alert('成功註冊')
        location.href ='./login.html';

    }).catch(err=>{
        console.log(err.response);
    })

})
}


