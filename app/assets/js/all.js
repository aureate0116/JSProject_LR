const wrapperLoading = document.querySelector('.wrapperLoading');


function clearLocalStorage(){
    localStorage.clear();
    Swal.fire({
        icon: 'error',
        title: '登入逾時',
        text: '請重新登入'
    });
    setTimeout(() => {
        document.location.href = './login.html';
    }, 2000);
}

function test(){
    console.log('登出測試')
}
function displayNoneWrapper(){
    wrapperLoading.setAttribute("class","d-none");
    document.querySelector("body").setAttribute("style","");
    if(document.querySelector(".loadingBG")!==null){
        document.querySelector(".loadingBG").setAttribute("class","d-none");
    }
}

function displayBlockWrapper(){
    document.querySelector("body").setAttribute("style","overflow-y:hidden");
    wrapperLoading.setAttribute("class","d-block");
    document.querySelector("body").setAttribute("style","");
    if(document.querySelector(".loadingBG")!==null){
        document.querySelector(".loadingBG").setAttribute("class","d-block");
    }
}

