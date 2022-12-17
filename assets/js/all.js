"use strict";

var url = "http://localhost:3000";
var userId = location.href.split("=")[1];
var localStorageUserId = localStorage.getItem("userId");
var localStorageToken = localStorage.getItem("accessToken");
var pageClassify = location.href.split("/")[3].split(".html")[0];
var headers = {
  Authorization: "Bearer ".concat(localStorageToken)
};
var homePage = location.href.split("/")[0] + "//" + location.href.split("/")[2]; //如果localStorage userid 是空的 或是 該id 跟 這個page的id 不同 ，就轉跳至首頁
//取得該用戶資料

var userData = [];

function initAccount() {
  if (localStorageUserId == userId && localStorageUserId !== "") {
    axios.get("".concat(url, "/users?id=").concat(localStorageUserId), headers).then(function (res) {
      userData = res.data;
      renderUserAccount();
    })["catch"](function (err) {
      if (err.request.status === 403) {
        document.location.href = "./acc_account.html?userid=".concat(localStorageUserId);
      } else if (err.request.status === 401) {
        clearLocalStorage();
      }

      ;
      console.log(err);
    });
  } else {
    if (location.href !== "".concat(homePage, "/index.html")) {
      if (pageClassify !== "resource" && pageClassify !== "resource_list" && location.href !== homePage + "/login.html" && location.href !== homePage + "/signup.html" && location.href !== homePage + "/acc_account.html" && location.href !== homePage + "/acc_resources.html") {
        location.href = "./index.html";
      }
    }
  }
}

initAccount(); //渲染既有資料

var userEmail = document.querySelector('#userEmail');
var userPW = document.querySelector('#userPW');
var leftMenu = document.querySelector('.leftMenu');

function renderUserAccount() {
  if (userEmail != null) {
    userEmail.value = userData[0].email;
  }

  var leftMenuStr = "<ul class=\"nav flex-row flex-lg-column\">\n        <li class=\"nav-item \">\n        <a class=\"nav-link active ps-0 px-lg-3\" aria-current=\"page\" href=\"./acc_profile.html?userid=".concat(localStorageUserId, "\">\u500B\u4EBA\u8CC7\u6599</a>\n        </li>\n        <li class=\"nav-item\">\n        <a class=\"nav-link ps-0 px-lg-3\" href=\"./acc_account.html?userid=").concat(localStorageUserId, "\">\u5E33\u6236\u5B89\u5168</a>\n        </li>\n        <!-- <li class=\"nav-item ps-0 px-lg-3\">\n        <a class=\"nav-link\" href=\"#\">\u901A\u77E5</a>\n        </li> -->\n    </ul>  ");

  if (leftMenu != null) {
    leftMenu.innerHTML = leftMenuStr;
  }
}

var constraints = {
  oldPassowrd: {
    presence: {
      message: "必填欄位"
    },
    length: {
      minimum: 5,
      message: "密碼長度請大於5"
    }
  },
  newPassword: {
    presence: {
      message: "必填欄位"
    },
    length: {
      minimum: 5,
      message: "密碼長度請大於5"
    }
  },
  confirmpw: {
    presence: {
      message: "必填欄位"
    },
    equality: {
      attribute: "newPassword2",
      message: "與前者輸入密碼不同" // comparator: function(v1, v2) {
      //     return v1 === v2;
      //   }

    }
  }
};
"use strict";

var url = "http://localhost:3000";
var userId = location.href.split("=")[1];
var localStorageUserId = localStorage.getItem("userId");
var localStorageToken = localStorage.getItem("accessToken"); // let pageClassify = location.href.split("/")[3].split(".html")[0];

var headers = {
  headers: {
    "authorization": "Bearer ".concat(localStorageToken)
  }
}; // let homePage = location.href.split("/")[0]+`//`+location.href.split("/")[2];
//如果localStorage userid 是空的 或是 該id 跟 這個page的id 不同 ，就轉跳至首頁
//取得該用戶資料

var userData = [];

function initProfile() {
  if (localStorageUserId == userId && localStorageUserId !== "") {
    axios.get("".concat(url, "/users?id=").concat(localStorageUserId), headers).then(function (res) {
      userData = res.data;
      renderUserData();
    })["catch"](function (err) {
      var _err$response, _err$response2;

      //console.log(err);
      if ((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 403) {
        document.location.href = "./acc_resources.html?userid=".concat(localStorageUserId);
      } else if ((err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status) === 401) {
        clearLocalStorage();
      }

      ;
    });
  } else {// if( location.href !== `${homePage}/index.html`){
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

initProfile(); //渲染用戶既有資料

var firstName = document.querySelector('#firstName');
var lastName = document.querySelector('#lastName');
var userTitle = document.querySelector('#userTitle');
var userExp = document.querySelector('#userExp'); // const websiteUrl = document.querySelector('#websiteUrl');

var profileImg = document.querySelector('.profileImg'); //左側選單

var leftMenu = document.querySelector('.leftMenu');

function renderUserData() {
  if (firstName !== null) {
    firstName.value = userData[0].firstName;
  }

  if (lastName !== null) {
    lastName.value = userData[0].lastName;
  }

  if (userData[0].title != undefined) {
    if (userTitle !== null) {
      userTitle.value = userData[0].title;
    }
  }

  if (userData[0].experiences != undefined) {
    if (userExp !== null) {
      userExp.value = userData[0].experiences;
    }
  } // if( userData[0].links.websiteUrl!=undefined){
  //     websiteUrl.value = userData[0].links.websiteUrl;
  // }
  // console.log(profileImg);


  var prefix = userData[0].firstName[0].toUpperCase();
  var profileImgStr = "\n    <span class=\"userImg d-inline-block bg-primary p-4 rounded-circle fw-bold lh-1 text-white text-center\">".concat(prefix, "</span>");

  if (profileImg !== null) {
    profileImg.innerHTML = profileImgStr;
  }

  var leftMenuStr = "<ul class=\"nav flex-row flex-lg-column\">\n        <li class=\"nav-item \">\n        <a class=\"nav-link active ps-0 px-lg-3\" aria-current=\"page\" href=\"./acc_profile.html?userid=".concat(localStorageUserId, "\">\u500B\u4EBA\u8CC7\u6599</a>\n        </li>\n        <li class=\"nav-item\">\n        <a class=\"nav-link ps-0 px-lg-3\" href=\"./acc_account.html?userid=").concat(localStorageUserId, "\">\u5E33\u6236\u5B89\u5168</a>\n        </li>\n        <!-- <li class=\"nav-item ps-0 px-lg-3\">\n        <a class=\"nav-link\" href=\"#\">\u901A\u77E5</a>\n        </li> -->\n    </ul>  ");

  if (leftMenu !== null) {
    leftMenu.innerHTML = leftMenuStr;
  }
} //如果欄位編輯, 檢查欄位格式


var profileInputs = document.querySelectorAll('.profileInput');

if (profileInputs !== null) {
  profileInputs.forEach(function (item) {
    item.addEventListener("change", function (e) {
      item.nextElementSibling.textContent = '';

      if (firstName.value == "") {
        document.querySelector('.firstName').textContent = '必填欄位';
      }

      if (lastName.value == "") {
        document.querySelector('.lastName').textContent = '必填欄位';
      }

      if (userTitle.value.length > 15) {
        document.querySelector('.userTitle').textContent = '字述請少於15';
      } // if(websiteUrl.value){
      // }

    });
  });
} //上傳圖片
//儲存按鈕監聽,格式正確才儲存


var btnSaveProfile = document.querySelector('.btnSaveProfile');

if (btnSaveProfile !== null) {
  btnSaveProfile.addEventListener("click", function (e) {
    if (firstName.value !== "" && lastName.value !== "" && userTitle.value.length < 15) {
      axios.patch("".concat(url, "/600/users/").concat(localStorageUserId), {
        "lastName": lastName.value,
        "firstName": firstName.value,
        "title": userTitle.value,
        "experiences": userExp.value
      }, headers).then(function (res) {
        Swal.fire({
          text: "已成功更新",
          icon: 'success',
          iconColor: "#4AA9B6",
          showConfirmButton: false,
          timer: 2000
        }); //console.log(res.data);
      })["catch"](function (err) {
        var _err$response3;

        if (err.request.status === 403) {
          document.location.href = "./acc_profile.html?userid=".concat(localStorageUserId);
        } else if ((err === null || err === void 0 ? void 0 : (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.status) === 401) {
          clearLocalStorage();
        }

        ;
      });
    }
  });
}
"use strict";

function initAccountResources() {
  getAccountUserData();
  getAccountBookmarkData();
}

initAccountResources();
var userResourcesList = document.querySelector('.userResourcesList'); //取得用戶資料

var localStorageUserId = localStorage.getItem("userId");
var localStorageToken = localStorage.getItem("accessToken"); // document.querySelector("body").setAttribute("style","overflow-y:hidden");

var userData = [];

function getAccountUserData() {
  axios.get("".concat(url, "/users?id=").concat(localStorageUserId)).then(function (res) {
    userData = res.data;
    document.title = "我的資源";
    renderUserResList();
  })["catch"](function (err) {
    var _err$response, _err$response2;

    if ((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 403) {
      document.location.href = "/acc_resources.html?userid=".concat(localStorageUserId);
    } else if ((err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status) === 401) {
      clearLocalStorage();
    }

    ;
    console.log(err);
  });
} //取得收藏資料


var userBookmark = [];

function getAccountBookmarkData() {
  axios.get("".concat(url, "/bookmarks?_expand=resource&&userId=").concat(localStorageUserId)).then(function (res) {
    userBookmark = res.data;
    renderUserResList();
  })["catch"](function (error) {
    var _err, _err$reponse, _err2, _err2$response;

    console.log(error);

    if (((_err = err) === null || _err === void 0 ? void 0 : (_err$reponse = _err.reponse) === null || _err$reponse === void 0 ? void 0 : _err$reponse.status) == 403) {
      document.location.href = "./acc_account.html?userid=".concat(localStorageUserId);
    } else if (((_err2 = err) === null || _err2 === void 0 ? void 0 : (_err2$response = _err2.response) === null || _err2$response === void 0 ? void 0 : _err2$response.status) == 401) {
      clearLocalStorage();
    }

    ;
  });
}

function renderUserResList() {
  var resItemStr = "";

  if (userBookmark.length != 0) {
    userBookmark.forEach(function (item) {
      var _item$resource;

      console.log(userBookmark);
      var score;

      if ((item === null || item === void 0 ? void 0 : (_item$resource = item.resource) === null || _item$resource === void 0 ? void 0 : _item$resource.averageScore) !== undefined) {
        var _item$resource2;

        score = item === null || item === void 0 ? void 0 : (_item$resource2 = item.resource) === null || _item$resource2 === void 0 ? void 0 : _item$resource2.averageScore;
      } else {
        score = 0;
      } //console.log(score,item.id);


      var starStr = "";

      if (score !== 0) {
        starStr = combineCommentStarbyScore(score);
      } //console.log(starStr);


      resItemStr += combineResRow(item, starStr);
    });

    if (userResourcesList != null) {
      userResourcesList.innerHTML = resItemStr;
    }
  } else {
    if (userResourcesList != null) {
      userResourcesList.innerHTML = "<div class=\"row\">\n            <div class=\"col text-center py-6 text-gray\">\u60A8\u76EE\u524D\u6C92\u6709\u6536\u85CF\u7684\u8CC7\u6E90</div></div> ";
    }
  }
}

function combineResRow(item, starStr) {
  //console.log(item.resource["averageScore"]);
  if (item.resource.imgUrl == "") {
    item.resource.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (starStr == "" || starStr == undefined) {
    return "\n        <div class=\"row my-3 d-flex align-items-center itemRow\">\n            <div class=\"col-1 d-none d-xl-block\"></div>\n            <div class=\"col-2 col-md-1 d-flex justify-content-center\">\n                <span class=\"material-icons-outlined fs-7 text-yellowBrown\">push_pin</span>\n                <!-- <span class=\"material-icons\">push_pin</span> -->\n            </div>\n\n            <div class=\"col-1 d-none d-md-block\">\n                <a href=\"./resource.html?id=".concat(item.resource.id, "\"><img src=\"").concat(item.resource.imgUrl, "\" alt=\"\"></a>\n            </div>\n            <div class=\"col-xl-4 col-4 col-md-5 \">\n                <h4 class=\"fs-7\"><a href=\"./resource.html?id=").concat(item.resource.id, "\"> ").concat(item.resource.title, "</a></h4>\n                <div class=\"d-flex flex-wrap align-items-center\">\n                    <span class=\"fs-8 fw-bold text-gray me-lg-2\">\u5C1A\u7121\u8A55\u8AD6</span>\n                </div>\n            </div>\n            <div class=\"col-xl-4 col-6 col-md-5 \">\n                <div class=\"d-flex align-items-center justify-content-center flex-wrap\">\n                    <a href=\"").concat(item.resource.url, "\" target=\"_blank\" type=\"button\" class=\"btn btn-tiffany my-2 mx-1 \">\u524D\u5F80\u8CC7\u6E90</a>\n                    <a href=\"./resource.html?id=").concat(item.resource.id, "\" type=\"button\" class=\"btn btn-yellowBrown my-2  mx-1\">\u67E5\u770B\u4ECB\u7D39</a>\n                    <div>\n                    <a role=\"button\" class=\" btn my-2 mx-1 text-yellowBrown\" >\n                        <span class=\"fs-6 material-icons btnRemove\" data-markId=\"").concat(item.id, "\">bookmark_remove</span></a>\n\n                   \n                    </div>    \n                </div>\n            </div>\n            <div class=\"col-1 d-none d-xl-block\"></div>\n        </div>");
  } else {
    return "\n        <div class=\"row my-3 d-flex align-items-center itemRow\">\n            <div class=\"col-1 d-none d-xl-block\"></div>\n            <div class=\"col-2 col-md-1 d-flex justify-content-center\">\n                <span class=\"material-icons-outlined fs-7 text-yellowBrown\">push_pin</span>\n                <!-- <span class=\"material-icons\">push_pin</span> -->\n            </div>\n            <div class=\"col-1 d-none d-md-block\">\n                <a href=\"./resource.html?id=".concat(item.resource.id, "\"><img src=\"").concat(item.resource.imgUrl, "\" alt=\"\"></a>\n            </div>\n            <div class=\"col-xl-4 col-4 col-md-5 \">\n                <h4 class=\"fs-7\"><a href=\"./resource.html?id=").concat(item.resource.id, "\"> ").concat(item.resource.title, "</a></h4>\n                <div class=\"d-flex flex-wrap align-items-center text-secondary\">\n                    <span class=\"fs-7 fw-bold me-lg-2\"> ").concat(item.resource["averageScore"].toFixed(1), "</span>\n                    <ul class=\"d-flex align-items-center lh-1 me-lg-2\">\n                        ").concat(starStr, "\n                    </ul>                                \n                </div>\n            </div>\n            <div class=\"col-xl-4 col-6 col-md-5 \">\n                <div class=\"d-flex align-items-center justify-content-center flex-wrap\">\n                    <a href=\"").concat(item.resource.url, "\" type=\"button\" class=\"btn btn-tiffany my-2 mx-1 \">\u524D\u5F80\u8CC7\u6E90</a>\n                    <a href=\"./resource.html?id=").concat(item.resource.id, "\" type=\"button\" class=\"btn btn-yellowBrown my-2  mx-1\">\u67E5\u770B\u8A55\u8AD6</a>\n                    <div>\n                    <a  role=\"button\" class=\"btn my-2 mx-1 text-yellowBrown\">\n                    <span class=\"fs-6 material-icons btnRemove\" data-markId=\"").concat(item.id, "\">bookmark_remove</span></a>  \n                   \n                    </div>    \n                </div>\n            </div>\n            <div class=\"col-1 d-none d-xl-block\"></div>\n        </div>");
  }
} //依分數組星星


function combineCommentStarbyScore(score) {
  var starStr = "";
  var scoreStr = score.toString();

  for (var i = 1; i <= scoreStr[0] * 1; i++) {
    starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>";
  } //半顆星星+空星星  


  if (scoreStr[2] <= 2 || scoreStr[2] == null) {
    for (var _i = 1; _i <= 5 - scoreStr[0] * 1; _i++) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li> ";
    }
  } else if (scoreStr[2] * 1 >= 3 && scoreStr[2] * 1 <= 7) {
    starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_half</span></li>";

    for (var _i2 = 1; _i2 <= 5 - scoreStr[0] - 1; _i2++) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
    }
  } else if (scoreStr[2] * 1 >= 8) {
    starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li";

    for (var _i3 = 1; _i3 <= 5 - scoreStr[0] * 1 - 1; _i3++) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
    }
  }

  return starStr;
} // const testButtonRemove = document.querySelector('.testButtonRemove');


if (userResourcesList !== null) {
  userResourcesList.addEventListener("click", function (e) {
    if (e.target.getAttribute("class") == "fs-6 material-icons btnRemove") {
      var bookmarkId = e.target.getAttribute("data-markId"); //console.log("點擊到移除收藏按鈕")

      Swal.fire({
        title: '您確定要取消收藏嗎?',
        icon: 'warning',
        iconColor: "#F8B436",
        showCancelButton: true,
        confirmButtonColor: '#4AA9B6',
        cancelButtonColor: '#F8B436',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(function (result) {
        if (result.isConfirmed) {
          axios["delete"]("".concat(url, "/bookmarks/").concat(bookmarkId), headers).then(function (res) {
            Swal.fire({
              title: '已成功取消收藏',
              confirmButtonColor: '#4AA9B6'
            });
            location.reload();
            console.log(res.data);
          })["catch"](function (err) {
            var _err$response3;

            if (err.request.status === 403) {
              document.location.href = "./acc_account.html?userid=".concat(localStorageUserId);
            } else if ((err === null || err === void 0 ? void 0 : (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.status) === 401) {
              clearLocalStorage();
            }

            ;
            console.log(err);
          });
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  });
}
// function initAccountResources(){
//     // getAccountUserData();
//     // getAccountBookmarkData();
// }
// // initAccountResources();
// // const userResourcesList = document.querySelector('.userResourcesList');
// // //取得用戶資料
// // let localStorageUserId = localStorage.getItem("userId");  
// // let localStorageToken = localStorage.getItem("accessToken");
// // // document.querySelector("body").setAttribute("style","overflow-y:hidden");
// // let userData=[];
// // function getAccountUserData(){
// //     axios.get(`${url}/users?id=${localStorageUserId}`)
// //     .then(res=>{
// //         userData = res.data;
// //         document.title ="我的資源";
// //         renderUserResList();
// //     }).catch(err=>{
// //         if (err.request.status === 403) {
// //             document.location.href = `/acc_resources.html?userid=${localStorageUserId}`;
// //         } else if (err.request.status === 401) {
// //             clearLocalStorage();
// //         };
// //       console.log(err);
// //     })
// // }
// // const fileUploader = document.querySelector('#file-uploader');
// // fileUploader.addEventListener('change', (e) => {
// //   console.log(e.target.files); // get file object
// // });
// // STEP 1: select element and register change event
// const imagePreview = document.querySelector('[data-target="image-preview"]');
// const spinner = document.querySelector('[data-target="spinner"]');
// const fileUploader = document.querySelector('[data-target="file-uploader"]');
// if(fileUploader!==null){
//     fileUploader.addEventListener("change", handleFileUpload);
// }
// async function handleFileUpload(e) {
//   try {
//     const file = e.target.files[0];
//     setUploading(true);
//     if (!file) return;
//     const beforeUploadCheck = await beforeUpload(file);
//     if (!beforeUploadCheck.isValid) throw beforeUploadCheck.errorMessages;
//     const arrayBuffer = await getArrayBuffer(file);
//     const response = await uploadFileAJAX(arrayBuffer);
//     alert("File Uploaded Success");
//     showPreviewImage(file);
//   } catch (error) {
//     alert(error);
//     console.log("Catch Error: ", error);
//   } finally {
//     e.target.value = '';  // reset input file
//     setUploading(false);
//   }
// }
// // STEP 2: showPreviewImage with createObjectURL
// function showPreviewImage(fileObj) {
//   const image = URL.createObjectURL(fileObj);
//   imagePreview.src = image;
// }
// // STEP 3: change file object into ArrayBuffer
// function getArrayBuffer(fileObj) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     // Get ArrayBuffer when FileReader on load
//     reader.addEventListener("load", () => {
//       resolve(reader.result);
//     });
//     // Get Error when FileReader on error
//     reader.addEventListener("error", () => {
//       reject("error occurred in getArrayBuffer");
//     });
//     // read the blob object as ArrayBuffer
//     // if you nedd Base64, use reader.readAsDataURL
//     reader.readAsArrayBuffer(fileObj);
//   });
// }
// // STEP 4: upload file throguth AJAX
// // - use "new Uint8Array()"" to change ArrayBuffer into TypedArray
// // - TypedArray is not a truely Array,
// //   use "Array.from()" to change it into Array
// function uploadFileAJAX(arrayBuffer) {
//   // correct it to your own API endpoint
//   return fetch("https://jsonplaceholder.typicode.com/posts/", {
//     headers: {
//       version: 1,
//       "content-type": "application/json"
//     },
//     method: "POST",
//     body: JSON.stringify({
//       imageId: 1,
//       icon: Array.from(new Uint8Array(arrayBuffer))
//     })
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw res.statusText;
//       }
//       return res.json();
//     })
//     .then(data => data)
//     .catch(err => console.log("err", err));
// }
// // STEP 5: Create before upload checker if needed
// function beforeUpload(fileObject) {
//   return new Promise(resolve => {
//     const validFileTypes = ["image/jpeg", "image/png"];
//     const isValidFileType = validFileTypes.includes(fileObject.type);
//     let errorMessages = [];
//     if (!isValidFileType) {
//       errorMessages.push("You can only upload JPG or PNG file!");
//     }
//     const isValidFileSize = fileObject.size / 1024 / 1024 < 2;
//     if (!isValidFileSize) {
//       errorMessages.push("Image must smaller than 2MB!");
//     }
//     resolve({
//       isValid: isValidFileType && isValidFileSize,
//       errorMessages: errorMessages.join("\n")
//     });
//   });
// }
// function setUploading(isUploading) {
//   if (isUploading === true) {
//     spinner.classList.add("opacity-1");
//   } else {
//     spinner.classList.remove("opacity-1");
//   }
// }
"use strict";
"use strict";

var wrapperLoading = document.querySelector('.wrapperLoading');

function clearLocalStorage() {
  localStorage.clear();
  Swal.fire({
    icon: 'error',
    title: '登入逾時',
    text: '請重新登入'
  });
  setTimeout(function () {
    document.location.href = './login.html';
  }, 2000);
}

function test() {
  console.log('登出測試');
}

function displayNoneWrapper() {
  wrapperLoading.setAttribute("class", "d-none");
  document.querySelector("body").setAttribute("style", "");

  if (document.querySelector(".loadingBG") !== null) {
    document.querySelector(".loadingBG").setAttribute("class", "d-none");
  }
}

function displayBlockWrapper() {
  wrapperLoading.setAttribute("class", "d-block");
  document.querySelector("body").setAttribute("style", "");

  if (document.querySelector(".loadingBG") !== null) {
    document.querySelector(".loadingBG").setAttribute("class", "d-block");
  }
}
"use strict";

var url = "http://localhost:3000"; // const url="./json/db.json"
// const url="http://localhost:3000/users"
// const url="http://localhost:3000/resources"
// const url="http://localhost:3000/bookmarks"
// const url="http://localhost:3000/comments"
"use strict";

var locationHref = location.href.split("/");
var resTopic = location.href.split("=")[1];
var resId = location.href.split("=")[1];
var userId = location.href.split("=")[1];
var localStorageUserId = localStorage.getItem("userId"); // let pageClassify = locationHref[3].split(".html")[0];

var homePage = locationHref[0] + "//" + locationHref[2]; //1. 頁面初始化

function initIndex() {
  getResourcesForIndex(); // if(pageClassify=="resource"){
  //     if(resId == undefined){
  //         location.href = `./index.html`;
  //     }
  // }
  // else if(pageClassify=="resource_list"){
  //     if(resTopic == undefined){
  //         location.href = `./index.html`;
  //     }
  // }
}

initIndex(); //好評推薦

var goodRate1 = document.querySelector('#goodRate1 > div.row');
var goodRate2 = document.querySelector('#goodRate2 > div.row');
var goodRate3 = document.querySelector('#goodRate3 > div.row');
var goodRate1Tab = document.querySelector('#goodRate1-tab');
var goodRate2Tab = document.querySelector('#goodRate2-tab');
var goodRate3Tab = document.querySelector('#goodRate3-tab'); //最新免費資源

var resourceType1 = document.querySelector('#resourceType1 > div.row');
var resourceType2 = document.querySelector('#resourceType2 > div.row');
var resourceType3 = document.querySelector('#resourceType3 > div.row');
var resource1Tab = document.querySelector('#resource1-tab');
var resource2Tab = document.querySelector('#resource2-tab');
var resource3Tab = document.querySelector('#resource3-tab');
var resourcesData = [];
var commentsData = [];
document.querySelector("body").setAttribute("style", "overflow-y:hidden"); //取得資源資料

function getResourcesForIndex() {
  axios.get("".concat(url, "/resources")).then(function (res) {
    resourcesData = res.data;
    document.title = "Eng!neer 程式學習資源網"; // displayNoneWrapper();

    if (wrapperLoading !== null) {
      wrapperLoading.setAttribute("class", "d-none");
      document.querySelector("body").setAttribute("style", "");

      if (document.querySelector(".loadingBG") !== null) {
        document.querySelector(".loadingBG").setAttribute("class", "d-none");
      }
    }

    sortGoodRateResources(resourcesData);
    renderGoodRateList();
    renderNewFreeList();
  })["catch"](function (error) {
    console.log(error);
  });
} //渲染好評推薦資料


function renderGoodRateList() {
  var commentScoreNum = getAverageScore();
  var resultScore = commentScoreNum[0];
  var commentNum = commentScoreNum[1];
  var starStr = combineCommentStar(resultScore);
  var itemNum1 = 0;
  var itemNum2 = 0;
  var itemNum3 = 0;
  var renderMaxNum = 6;
  var tabJS = "";
  var tabHtml = "";
  var tabPython = "";
  resourcesData.forEach(function (item) {
    // console.log("resultScore");
    // console.log(resultScore);
    switch (item.topics) {
      case "JavaScript":
        if (itemNum1 < renderMaxNum) {
          tabJS += combineResouorceItemType1(item, resultScore, starStr, commentNum);
          itemNum1 += 1;
        }

        break;

      case "HTML/CSS":
        if (itemNum2 < renderMaxNum) {
          tabHtml += combineResouorceItemType1(item, resultScore, starStr, commentNum);
          itemNum2 += 1;
        }

        break;

      case "Python":
        if (itemNum3 < renderMaxNum) {
          tabPython += combineResouorceItemType1(item, resultScore, starStr, commentNum);
          itemNum3 += 1;
        }

        break;
    }
  });

  if (goodRate1 !== null) {
    if (tabJS == "") {
      goodRate1Tab.setAttribute("class", "d-none");
    }

    goodRate1.innerHTML = tabJS;
  }

  if (goodRate2 !== null) {
    if (tabHtml == "") {
      goodRate2Tab.setAttribute("class", "d-none");
    }

    goodRate2.innerHTML = tabHtml;
  }

  if (goodRate3 !== null) {
    if (tabPython == "") {
      goodRate3Tab.setAttribute("class", "d-none");
    }

    goodRate3.innerHTML = tabPython;
  }
} //組單一資源項目html - type 1


function combineResouorceItemType1(item, resultScore, starStr, commentNum) {
  if (item.imgUrl === "") {
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (resultScore[item.id] === undefined || starStr[item.id] === undefined || commentNum[item.id] === undefined) {
    return "\n    <div class=\"col-md-6 col-lg-4\">\n    <div class=\"d-flex p-2 align-items-center\">\n        <div class=\"row\">\n            <div class=\"col-6\"><a href=\"./resource.html?id=".concat(item.id, "\" ><img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></div>\n            \n            <div class=\"col-6\">\n                <h4 class=\"ellipsis\"><a href=\"./resource.html?id=").concat(item.id, "\" > ").concat(item.title, "</a></h4>\n                <div class=\"d-flex justify-content-between text-gray fs-8 align-items-center\">\n                \u5C1A\u7121\u8A55\u50F9\n                </div>\n            </div>\n            \n        </div>\n         \n        \n    </div>\n    </div>\n    ");
  } else {
    return "\n    <div class=\"col-md-6 col-lg-4\">\n    <div class=\"d-flex p-2 align-items-center\">\n        <div class=\"row\">\n            <div class=\"col-6\"><a href=\"./resource.html?id=".concat(item.id, "\" ><img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></div>\n\n            <div class=\"col-6\">\n                <h4 class=\"ellipsis\"><a href=\"./resource.html?id=").concat(item.id, "\" > ").concat(item.title, "</a></h4>\n                <div class=\"d-flex justify-content-start align-items-center \">\n                    <span class=\"fs-7 fw-bold text-secondary\"> ").concat(resultScore[item.id], "</span>\n                    <ul class=\"d-flex align-items-center mx-2 lh-1 text-secondary\">\n                    ").concat(starStr[item.id], "\n                    </ul>                                \n                    <span class=\"fs-8 text-secondary\">(").concat(commentNum[item.id], ")</span>\n                </div>\n            </div>\n        </div>\n        \n    </div>\n    </div>");
  }
} //渲染最新免費資源


function renderNewFreeList() {
  var commentScoreNum = getAverageScore();
  var resultScore = commentScoreNum[0];
  var commentNum = commentScoreNum[1];
  var starStr = combineCommentStar(resultScore);
  var itemNum1 = 0;
  var itemNum2 = 0;
  var itemNum3 = 0;
  var renderMaxNum = 6;
  var tabOnline = "";
  var tabOffline = "";
  var tabArticle = "";
  resourcesData.forEach(function (item) {
    if (item.price === "免費") {
      if (item.type === "線上課程") {
        if (itemNum1 < renderMaxNum) {
          tabOnline += combineResouorceItem(item, resultScore, starStr, commentNum);
          itemNum1 += 1;
        }
      }

      if (item.type === "實體課程") {
        if (itemNum2 < renderMaxNum) {
          tabOffline += combineResouorceItem(item, resultScore, starStr, commentNum);
          itemNum2 += 1;
        }
      }

      if (item.type === "文章") {
        if (itemNum3 < renderMaxNum) {
          tabArticle += combineResouorceItem(item, resultScore, starStr, commentNum);
          itemNum3 += 1;
        }
      }
    }
  });

  if (resourceType1 !== null) {
    resourceType1.innerHTML = tabOnline;

    if (tabOnline == "") {
      resource1Tab.setAttribute("class", "d-none");
    }
  }

  if (resourceType2 !== null) {
    resourceType2.innerHTML = tabOffline;

    if (tabOffline == "") {
      resource2Tab.setAttribute("class", "d-none");
    }
  }

  if (resourceType3 !== null) {
    resourceType3.innerHTML = tabArticle;

    if (tabArticle == "") {
      resource3Tab.setAttribute("class", "d-none");
    }
  }
}

function sortGoodRateResources(resRenderList) {
  var _resRenderList;

  resRenderList = (_resRenderList = resRenderList) === null || _resRenderList === void 0 ? void 0 : _resRenderList.sort(function (a, b) {
    return b.averageScore - a.averageScore;
  });
  return resRenderList;
}
"use strict";

var localStorageUserId = localStorage.getItem("userId");
var localStorageUserToken = localStorage.getItem("accessToken");
var beforeLogin = document.querySelector('.beforeLogin');
var afterLogin = document.querySelector('.afterLogin');
var accountMenuImg = document.querySelector('.accountMenuImg');
var accountMenu = document.querySelector('.accountMenu');
var logOut = document.querySelector('.logOut'); //如果有取得 userid  就表示有登入

if (localStorageUserId == null || localStorageUserId == "") {
  if (afterLogin !== null) {
    afterLogin.setAttribute("class", "d-none");
  }
} else {
  if (beforeLogin !== null) {
    beforeLogin.setAttribute("class", "d-none");
  }

  var userData = [];
  axios.get("".concat(url, "/users?id=").concat(localStorageUserId), headers).then(function (res) {
    userData = res.data;
    renderAccountMenu(userData);
  })["catch"](function (err) {
    var _err$reponse;

    if ((err === null || err === void 0 ? void 0 : (_err$reponse = err.reponse) === null || _err$reponse === void 0 ? void 0 : _err$reponse.status) === 401) {
      clearLocalStorage();
      test();
    }

    console.log(err);
  });
} //隱藏登入註冊, 顯示會員功能, 帶入相關會員資訊 , 切換至會員頁時帶入會員 id 資料等
//將 userid 渲染至選單連結中


function renderAccountMenu(userData) {
  if (userData.length != 0) {
    var prefix = userData[0].firstName[0].toUpperCase();
    var accountMenuImgStr = "\n        <span class=\"userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center\">".concat(prefix, "</span>");
    var accountMenuStr = "<li><a class=\"dropdown-item\" href=\"./acc_profile.html?userid=".concat(localStorageUserId, "\">\u500B\u4EBA\u8CC7\u6599</a></li>\n        <li><a class=\"dropdown-item\" href=\"./acc_resources.html?userid=").concat(localStorageUserId, "\">\u6211\u7684\u8CC7\u6E90</a></li>\n        <li><a class=\"dropdown-item\" href=\"#\">\u6211\u7684\u52DF\u96C6</a></li>\n        <li><a class=\"dropdown-item\" href=\"#\">\u6211\u7684\u5B78\u7FD2</a></li>\n        <li><a class=\"dropdown-item\" href=\"#\">\u8A2D\u5B9A</a></li>");
    accountMenuImg.innerHTML = accountMenuImgStr;
    accountMenu.innerHTML = accountMenuStr;
  }
} //如果登出,就清空 localStorage userId


logOut.addEventListener("click", function (e) {
  localStorage.setItem('accessToken', "");
  localStorage.setItem('userId', "");

  if (beforeLogin !== null) {
    beforeLogin.setAttribute("class", "d-block");
  }

  if (afterLogin !== null) {
    afterLogin.setAttribute("class", "d-none");
  } // location.href = "./index.html";


  location.reload();
});
"use strict";

var loginAccount = document.querySelector('#loginAccount');
var loginPw = document.querySelector('#loginPw');
var btnLogin = document.querySelector('#btnLogin'); // const signUpFormInputs = document.querySelectorAll('input.form-control');  //input

function initLogin() {
  getUserListbyLoginPage();
}

initLogin(); //取得用戶清單

var usersData = [];

function getUserListbyLoginPage() {
  axios.get("".concat(url, "/users")).then(function (res) {
    usersData = res.data;
  })["catch"](function (err) {
    console.log(err);
  });
} //欄位檢查


if (document.querySelector("#loginAccount") !== null) {
  document.querySelector("#loginAccount").addEventListener("change", function (e) {
    document.querySelector('.account').textContent = "";

    if (loginAccount.value == "") {
      document.querySelector('.account').textContent = "請輸入帳號";
    } else {
      document.querySelector('.account').textContent = "";
    }

    var result = usersData.filter(function (userItem) {
      return userItem.email === loginAccount.value;
    }); // console.log("result");
    // console.log(result);

    if (result.length == 0) {
      document.querySelector('.account').textContent = "此帳號不存在";
    }
  });
}

if (document.querySelector("#loginPw") !== null) {
  document.querySelector("#loginPw").addEventListener("change", function (e) {
    document.querySelector('.password').textContent = "";

    if (loginPw.value == "") {
      document.querySelector('.password').textContent = "請輸入密碼";
    } else {
      document.querySelector('.password').textContent = "";
    }
  });
}

if (btnLogin !== null) {
  btnLogin.addEventListener("click", function (e) {
    e.preventDefault();

    if (loginAccount.value === "" || loginPw.value === "") {
      return;
    }

    if (document.querySelector('.account').textContent == "" && document.querySelector('.password').textContent == "") {
      axios.post("http://localhost:3000/login", {
        "email": loginAccount.value,
        "password": loginPw.value
      }).then(function (res) {
        localStorage.setItem('accessToken', "".concat(res.data.accessToken));
        localStorage.setItem('userId', res.data.user.id);
        location.href = "./index.html";
      })["catch"](function (err) {
        document.querySelector('.password').textContent = "密碼錯誤";
        localStorage.clear();
      });
    }
  });
}
"use strict";

var resId = parseFloat(location.href.split("=")[1]);
var headers = {
  headers: {
    "authorization": "Bearer ".concat(localStorageToken)
  }
};

function initResourcePage() {
  getResourcesForResources();
  getCommentData();
  getResourcesItem(resId);
  getResourcesComment(resId);
  getUserData();
  getbookmarkData(); //submitComment();
}

initResourcePage();
var resourcesData = [];
var commentsData = []; // 取得所有資源資料

function getResourcesForResources() {
  axios.get("".concat(url, "/resources")).then(function (res) {
    resourcesData = res.data;
  })["catch"](function (error) {
    console.log(error);
  });
}

function getCommentData() {
  axios.get("".concat(url, "/comments")).then(function (res) {
    commentsData = res.data;
    renderRelatedResource();
  })["catch"](function (error) {
    console.log(error);
  });
}

var resourceContent = [];
var resourceCommentData = []; //取得單一資源

function getResourcesItem(id) {
  axios.get("".concat(url, "/resources?id=").concat(id, "&_expand=user")).then(function (res) {
    resourceContent = res.data;
    renderResource();
    renderRelatedResource();
  })["catch"](function (error) {
    console.log(error);
  });
}

function getResourcesComment(id) {
  axios.get("".concat(url, "/comments?_expand=resouceId&&resourceId=").concat(id, "&&_expand=user")).then(function (res) {
    resourceCommentData = res.data;
    renderResource();
    renderComment();
    submitComment();
  })["catch"](function (error) {
    console.log(error);
  });
}
/******************資源資訊***********************/


var imageNBrief = document.querySelector('.imageNBrief');
var titleBox = document.querySelector('.titleBox');
var btnResLink = document.querySelector('.btnResLink');

function renderResource() {
  var renderItem = resourceContent[0];
  var userName = "";

  if (renderItem !== undefined) {
    document.title = renderItem.title;

    if (renderItem.user.role === "admin") {
      userName = "admin";
    } else {
      userName = "".concat(renderItem.user.lastName, " ").concat(renderItem.user.firstName, " ");
    }

    var commentScoreNum = getAverageScore();
    var resultScore = commentScoreNum[0];
    var commentNum = commentScoreNum[1];
    var starStr = combineCommentStar(resultScore);
    var imageNBriefStr = "";
    var titleBoxStr = "";
    var btnBoxStr = "";

    if (renderItem.imgUrl === "") {
      renderItem.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
    }

    if (resultScore[resId] === undefined || starStr[resId] === undefined) {
      titleBoxStr = "<h2 class=\"fs-5 fw-bold mt-md-0 mt-3\">".concat(renderItem.title, "</h2>\n            <div class=\"d-flex flex-wrap align-items-center text-secondary\">\n                <span class=\"fs-8 fw-bold me-lg-2\">\u5C1A\u7121\u8A55\u50F9</span>\n            </div>\n            <div class=\"classify fs-7\">\n                <ul class=\"d-flex \">\n                    <li class=\"me-2\">  ").concat(renderItem.topics, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.type, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.level, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.price, "</li>\n                </ul>\n                <ul>\n                    <li class=\"me-2\">  ").concat(renderItem.lang, " </li>\n                    <li class=\"me-2\">\u5EFA\u7ACB\u8005 : ").concat(userName, " </li>\n                </ul>\n            </div>");
    } else {
      titleBoxStr = "<h2 class=\"fs-5 fw-bold mt-md-0 mt-3\">".concat(renderItem.title, "</h2>\n            <div class=\"d-flex flex-wrap align-items-center text-secondary\">\n                <span class=\"fs-5 fw-bold me-lg-2\"> ").concat(resultScore[resId], "</span>\n                <ul class=\"d-flex align-items-center lh-1 me-lg-2\">\n                ").concat(starStr[resId], "\n                </ul>                                \n                <span class=\"fs-8\">(").concat(commentNum[resId], ")</span>\n            </div>\n            <div class=\"classify fs-7\">\n                <ul class=\"d-flex \">\n                    <li class=\"me-2\">  ").concat(renderItem.topics, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.type, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.level, "</li>\n                    <li class=\"me-2\">  ").concat(renderItem.price, "</li>\n                </ul>\n                <ul>\n                    <li class=\"me-2\">  ").concat(renderItem.lang, " </li>\n                    <li class=\"me-2\">\u5EFA\u7ACB\u8005 : ").concat(userName, " </li>\n                </ul>\n            </div>");
    }

    btnBoxStr = "\n        <a href=\"".concat(renderItem.url, "\" type=\"button\" target=\"_blank\" class=\"btn btn-secondary my-2 text-white px-lg-4 py-2 fs-6 w-100\">\u524D\u5F80\u8CC7\u6E90</a>");
    imageNBriefStr = "\n        <img class=\"d-md-block\" src=\"".concat(renderItem.imgUrl, "\" alt=\"").concat(renderItem.title, "\">\n                    <div class=\"mt-md-3 text-dark\">").concat(renderItem.intro, "</div>");

    if (imageNBrief !== null) {
      imageNBrief.innerHTML = imageNBriefStr;
    }

    if (titleBox !== null) {
      titleBox.innerHTML = titleBoxStr;
    }

    if (btnResLink !== null) {
      btnResLink.innerHTML = btnBoxStr;
    }
  }
}
/******************資源評論***********************/


var commentList = document.querySelector('.resourceComment > .commentList');
var commentSort = document.querySelector('#commentSort');

function renderComment() {
  var commentStr = "";
  var userName = ""; // console.log(resourceCommentData)

  if (resourceCommentData.length === 0) {
    var btnReadMore = document.querySelector('.btnReadMore');

    if (btnReadMore !== null) {
      btnReadMore.setAttribute("class", "d-none");
    }
  } //let resultScore = getAverageScore();


  var commentNum = 0;
  resourceCommentData.forEach(function (item) {
    var resultScore = {
      "1": "".concat(item.score)
    };
    var newResultScoreOjb = combineCommentStar(resultScore);

    if (item.user.role === "admin") {
      userName = "admin";
    } else {
      userName = "".concat(item.user.firstName, " ").concat(item.user.lastName);
    }

    var prefix = item.user.firstName[0].toUpperCase();
    var commentTimeAge = Ftime(item.commentTime);
    commentStr += "\n        <div class=\"col mb-3 position-relatvie\" style=\"z-index:10;\">\n            <div class=\"card card-body position-relatvie d-flex justify-content-between\" style=\"z-index:10;\">\n                <div class=\"d-flex align-items-lg-center flex-column flex-lg-row justify-content-between\"> \n                    <h3 class=\"card-title fs-7 d-flex align-items-center justify-content-lg-start justify-content-between\">\n\n                        <span class=\"userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center\">".concat(prefix, "</span>\n\n                        <p class=\"mb-0 mx-2 text-start\">\n                            ").concat(userName, "<br/>\n                            <span class=\"fs-9 text-gray\">").concat(item.user.title, "</span>\n                        </p>\n                        \n                    </h3>\n                    <div class=\"d-flex flex-lg-column justify-content-between\">\n                        <ul class=\"card-text d-flex align-items-center lh-1\">\n                        ").concat(newResultScoreOjb[1], "\n                        \n                        </ul> \n                        <p class=\"mb-0 text-end\">\n                            <span class=\"fs-9 text-gray\">").concat(commentTimeAge, "</span></p>\n                    </div>\n                </div>\n\n                <div class=\"d-flex flex-column\">\n                    <div class=\"form-floating my-3\"> \n                        <p>").concat(item.content, "</p>\n                    </div>\n                </div>\n\n                <div class=\"d-flex justify-content-between fs-8\">\n                    <!-- like & dislike -->\n                    <div class=\"d-flex align-items-center\">\n                        <a href=\"#\">\n                            <span class=\"material-icons-outlined fs-6\">thumb_up_alt</span></a>\n                        <span class=\"mx-2\">").concat(item.likeNum, "</span>\n                        <!-- <a href=\"#\">\n                        <span class=\"material-icons fs-6\">thumb_up_alt</span></a> -->\n\n                            <a href=\"#\">\n                            <span class=\"material-icons-outlined fs-6\">thumb_down_alt</span></a>\n                            <span class=\"mx-2\">").concat(item.dislikeNum, "</span>\n                            <!-- <a href=\"#\">\n                            <span class=\"material-icons fs-6\">thumb_down_alt</span></a> -->\n\n                    </div>\n\n                    <div class=\"position-relatvie\" >\n                        <a class=\"d-flex align-items-center\" data-bs-toggle=\"collapse\" href=\"#commentOffense").concat(commentNum + 1, "\" role=\"button\" aria-expanded=\"false\" aria-controls=\"commentOffense\">\n                            <span class=\"material-icons-outlined\">report</span>\n                            <span>\u6AA2\u8209</span>\n                        </a>\n\n                        <div class=\"offenseItem border bg-light rounded-3 p-3 collapse position-absolute end-0\" id=\"commentOffense").concat(commentNum + 1, "\" style=\"z-index:0;\">\n                            <div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"radio\" name=\"offenseItem\" id=\"offenseItem1\">\n                                <label class=\"form-check-label\" for=\"offenseItem1\">\n                                    \u504F\u96E2\u4E3B\u984C\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"radio\" name=\"offenseItem\" id=\"offenseItem2\">\n                                <label class=\"form-check-label\" for=\"offenseItem2\">\n                                    \u5783\u573E\u5167\u5BB9\u53CA\u5EE3\u544A\u5BA3\u50B3\n                                </label>\n                            </div>\n                            <div class=\"form-check\">\n                                <input class=\"form-check-input\" type=\"radio\" name=\"offenseItem\" id=\"offenseItem3\">\n                                <label class=\"form-check-label\" for=\"offenseItem3\">\n                                    \u9A37\u64FE\u5167\u5BB9\u53CA\u4E0D\u96C5\u7528\u8A9E\n                                </label>\n                            </div>\n                            <button class=\"btn btn-primary btn-sm text-white\" type=\"submit\">\u9001\u51FA</button>\n                        </div>\n                    </div>\n                </div>\n            </div><!--end card-->\n        </div>");
    commentNum += 1;
  });

  if (commentList !== null) {
    commentList.innerHTML = commentStr;
  }

  if (commentStr == "") {
    if (commentSort !== null) {
      commentSort.setAttribute("class", "d-none");
      commentList.innerHTML = "<div class=\"text-center\">\u76EE\u524D\u5C1A\u7121\u8A55\u8AD6\uFF0C\u6B61\u8FCE\u60A8\u7559\u8A00\u5206\u4EAB\u5BF6\u8CB4\u7684\u7D93\u9A57\u5537!</div>";
    }
  }
}
/******************相關資源***********************/


var relatedResource = document.querySelector('.relatedResource');
var relatedTitle = document.querySelector('h3.relatedTitle');

function renderRelatedResource() {
  var relatedStr = "";
  var renderNum = 1;
  var commentScoreNum = getAverageScore();
  var resultScore = commentScoreNum[0];
  var commentNum = commentScoreNum[1];
  var starStr = combineCommentStar(resultScore);

  if (resourcesData !== undefined) {
    resourcesData.forEach(function (resItem) {
      // let resultScore = getAverageScore();
      // let newResultScoreOjb = combineCommentStar(resultScore);
      if (resourceContent.length !== 0) {
        //console.log(resourceContent);
        if (resItem.topics === resourceContent[0].topics && resItem.id !== resourceContent[0].id) {
          renderNum += 1;

          if (renderNum <= 5) {
            if (resultScore[resItem.id] == undefined || starStr[resItem.id] == undefined || commentNum[resItem.id] == undefined) {
              relatedStr += "\n                        <div class=\"my-4\">\n                        <h4 class=\"fs-7\"><a href=\"./resource.html?id=".concat(resItem.id, "\" > ").concat(resItem.title, "</a></h4>\n                            <div class=\"d-flex flex-wrap justify-content-start align-items-center\">\n                                <span class=\"fs-8 text-gray me-lg-2\">\u5C1A\u7121\u8A55\u50F9</span>                           \n                            </div>\n                        </div>\n                        ");
            } else {
              relatedStr += "\n                        <div class=\"my-4\">\n                        <h4 class=\"fs-7\"><a href=\"./resource.html?id=".concat(resItem.id, "\"> ").concat(resItem.title, "</a></h4>\n                        <div class=\"d-flex flex-wrap justify-content-start align-items-center text-secondary\">\n                            <span class=\"fs-7 fw-bold me-lg-2\">").concat(resultScore[resItem.id], "</span>\n                            <ul class=\"d-flex align-items-center lh-1 me-lg-2 \">\n                            ").concat(starStr[resItem.id], "\n                            </ul>   \n                            <span class=\"fs-8\">(").concat(commentNum[resItem.id], ")</span>                             \n                        </div>\n                        </div>\n                        ");
            }
          }
        }
      }
    });
  }

  if (relatedResource !== null) {
    relatedResource.innerHTML = relatedStr;
  }

  if (relatedTitle !== null) {
    if (relatedStr == "") {
      relatedTitle.setAttribute("class", "d-none");
    }
  }
}
/******************立即評論***********************/


var btnComment = document.querySelector('.btnComment');
var commentContent = document.querySelector('.commentContent');
var userInfo = document.querySelector('h3.userInfo');
var btnCommentSubmit = document.querySelector('.btnCommentSubmit');
var commentStar = document.querySelectorAll('.commentStar > li > a >span');
var commentTextarea = document.querySelector('#commentTextarea');
var btnBookmark = document.querySelector('.btnBookmark'); //取得該用戶資料

var localStorageUserId = localStorage.getItem("userId");
var localStorageToken = localStorage.getItem("accessToken");
var userData = [];
document.querySelector("body").setAttribute("style", "overflow-y:hidden");

function getUserData() {
  axios.get("".concat(url, "/users?id=").concat(localStorageUserId)).then(function (res) {
    userData = res.data;
    renderBtnCommentContent();
  })["catch"](function (error) {
    var _error$response;

    if ((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) == 401) {
      clearLocalStorage();
    }

    console.log(error);
  });
}

var userBookmark;

function getbookmarkData() {
  axios.get("".concat(url, "/bookmarks?userId=").concat(localStorageUserId)).then(function (res) {
    userBookmark = res.data;
    renderBookmark();
  })["catch"](function (error) {
    var _error$response2;

    console.log(error);

    if ((error === null || error === void 0 ? void 0 : (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) == 401) {
      clearLocalStorage();
    }
  });
} //渲染按鈕 //更新 collapseComment   判斷是否有"收藏"


function renderBtnCommentContent() {
  //console.log(localStorageUserId,localStorageToken);
  if (btnComment !== null) {
    btnComment.setAttribute("href", "#collapseComment".concat(resId));
    btnComment.setAttribute("aria-controls", "collapseComment".concat(resId));
  }

  if (commentContent !== null) {
    commentContent.setAttribute("id", "collapseComment".concat(resId));
  } // console.log("resId");
  // console.log(resId);
  //如果有登入


  var userInfoStr = "";

  if (localStorageUserId !== "" && localStorageUserId !== null) {
    var prefix = userData[0].firstName[0].toUpperCase();
    userInfoStr = "\n        <span class=\"userImg d-inline-block bg-primary px-2 py-2 rounded-circle fw-bold fs-7 lh-1 text-white text-center\">".concat(prefix, "</span>\n        <p class=\"mb-0 mx-2 text-start\">\n            ").concat(userData[0].firstName, " ").concat(userData[0].lastName, "<br/>\n            <span class=\"fs-9 text-gray\">").concat(userData[0].title, "</span>\n\n        </p>");

    if (userInfo !== null) {
      userInfo.innerHTML = userInfoStr;
    }
  } else {
    if (commentContent !== null) {
      commentContent.setAttribute("class", "d-none");
    }

    if (btnComment !== null) {
      btnComment.setAttribute("href", "");
      btnComment.addEventListener("click", function (e) {
        //alert("請先登入");
        Swal.fire({
          text: "\u8ACB\u5148\u767B\u5165",
          icon: 'info',
          iconColor: "#4AA9B6",
          confirmButtonColor: "#4AA9B6"
        }); //location.href="./login.html"
      });
    }
  }
}

function renderBookmark() {
  if (localStorageUserId !== "" && localStorageUserId !== null) {
    //console.log(resId);
    var result = userBookmark.filter(function (item) {
      return item.resourceId == resId;
    }); //console.log(result);

    if (result.length !== 0) {
      if (btnBookmark !== null) {
        btnBookmark.innerHTML = "<span class=\"material-icons text-secondary\">bookmark</span>\n                <span class=\"text-secondary\">\u6536\u85CF</span>";
      }
    }

    if (btnBookmark != null) {
      btnBookmark.addEventListener("click", function (e) {
        //如果已收藏 會取消收藏 delete bookmarks
        if (result.length !== 0) {
          //console.log(result[0].id);
          axios["delete"]("".concat(url, "/bookmarks/").concat(result[0].id), headers).then(function (res) {
            btnBookmark.innerHTML = "<span class=\"material-icons\">bookmark_border</span>\n                        <span>\u6536\u85CF</span>";
            location.reload();
          })["catch"](function (err) {
            var _err$response;

            if ((err === null || err === void 0 ? void 0 : (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 401) {
              clearLocalStorage();
            }

            ;
            console.log(err);
          });
        } else if (result.length == 0) {
          //如果尚未收藏  會加入收藏  post bookmarks
          axios.post("".concat(url, "/600/bookmarks?userId=").concat(localStorageUserId), {
            "resourceId": resId,
            "userId": localStorageUserId,
            "isFixedTop": false
          }, headers).then(function (res) {
            btnBookmark.innerHTML = "<span class=\"material-icons text-secondary\">bookmark</span>\n                        <span class=\"text-secondary\">\u6536\u85CF</span>";
            location.reload(); //console.log(res.data);
          })["catch"](function (err) {
            var _err$response2;

            console.log(err);

            if ((err === null || err === void 0 ? void 0 : (_err$response2 = err.response) === null || _err$response2 === void 0 ? void 0 : _err$response2.status) === 401) {
              clearLocalStorage();
            }

            ;
          });
        }
      });
    }
  } else {
    if (btnBookmark != null) {
      btnBookmark.addEventListener("click", function (e) {
        //alert("請先登入");
        Swal.fire({
          text: "\u8ACB\u5148\u767B\u5165",
          icon: 'info',
          iconColor: "#4AA9B6",
          confirmButtonColor: "#4AA9B6",
          // showConfirmButton: false,
          timer: 1500
        }); // location.href="./login.html";
        //setTimeout("location.href='./login.html'",4000);
      });
    }
  }
}

var thisTime = (Date.now() / 1000).toFixed(0); // console.log("thisTime");
// console.log(thisTime);

var starNum = 0; //checked 星星
// console.log(commentStar);

commentStar.forEach(function (starItem, index) {
  starItem.addEventListener("click", function (e) {
    for (var i = 0; i <= commentStar.length - 1; i++) {
      commentStar[i].textContent = "star_outline";
      starNum = 0;
    }

    for (var _i = 0; _i <= index; _i++) {
      commentStar[_i].textContent = "star";
      starNum += 1;
    } // console.log("starNum");
    // console.log(starNum);

  });
}); //檢查留言字數

if (commentTextarea !== null) {
  commentTextarea.addEventListener("change", function (e) {
    if (commentTextarea.value.length < 20) {
      document.querySelector('.commentTextarea').textContent = "字數須超過20字";
      return;
    } else {
      document.querySelector('.commentTextarea').textContent = "";
    }
  });
} //送出評論, 要更新總評分


function submitComment() {
  // console.log("resourceCommentData");
  // console.log(resourceCommentData);
  var totalScore = 0;
  resourceCommentData.forEach(function (item) {
    totalScore += item.score;
  });
  var thisResAverageScore = totalScore / resourceCommentData.length; // console.log("thisResAverageScore");
  // console.log(thisResAverageScore);

  if (btnCommentSubmit != null) {
    btnCommentSubmit.addEventListener("click", function (e) {
      if (commentTextarea.value == "") {
        Swal.fire({
          text: "請填寫評價內容",
          icon: 'info',
          iconColor: "#4AA9B6",
          confirmButtonColor: "#4AA9B6",
          showConfirmButton: true
        });
      }

      if (starNum == 0) {
        Swal.fire({
          text: "請給予評分",
          icon: 'info',
          iconColor: "#4AA9B6",
          confirmButtonColor: "#4AA9B6",
          showConfirmButton: true
        });
      }

      if (commentTextarea.value !== "" && commentTextarea.value.length >= 20 && starNum !== 0) {
        axios.post("".concat(url, "/600/comments/"), {
          "resourceId": resId,
          "userId": localStorageUserId,
          "commentTime": thisTime,
          "score": starNum,
          "content": commentTextarea.value,
          "likeNum": 0,
          "dislikeNum": 0
        }, headers).then(function (res) {
          var newAverageScore;

          if (thisResAverageScore == NaN || resourceCommentData.length == 0) {
            newAverageScore = starNum;
          } else {
            newAverageScore = (thisResAverageScore * resourceCommentData.length + starNum) / (resourceCommentData.length + 1).toFixed(1);
          }

          axios.patch("".concat(url, "/resources/").concat(resId), {
            "averageScore": newAverageScore
          }).then(function (res) {
            console.log(res.data);
          })["catch"](function (err) {
            console.log(err);
          });
          location.reload();
        })["catch"](function (err) {
          var _err$response3;

          console.log(err);

          if ((err === null || err === void 0 ? void 0 : (_err$response3 = err.response) === null || _err$response3 === void 0 ? void 0 : _err$response3.status) === 401) {
            clearLocalStorage();
          }

          ;
        });
      }
    });
  }
}
/******************收藏資源***********************/
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//1. 頁面初始化
function initResourceList() {
  getResourcesForResources();
  getCommentData();
}

initResourceList();
/*****************top ***************/

var bannerBlockTitle = document.querySelector('.bannerBlock > h2');

if (resTopic !== undefined && bannerBlockTitle !== null) {
  bannerBlockTitle.textContent = resTopic;
}
/*****************入門推薦 ***************/


var foundation1Basic = document.querySelector('#foundation1Basic > div.row');
var foundation2Free = document.querySelector('#foundation2Free > div.row');
var foundation3CN = document.querySelector('#foundation3CN > div.row');
var resourcesData = [];
var commentsData = [];
var thisTopicData = []; //2. 取得資料

function getResourcesForResources() {
  axios.get("".concat(url, "/resources")).then(function (res) {
    resourcesData = res.data.filter(function (item) {
      return item.topics == resTopic;
    });
    renderFoundationRecommond();
    renderFilterResultList();
    sortResourcesList();
  })["catch"](function (error) {
    console.log(error);
  });
}

function getCommentData() {
  axios.get("".concat(url, "/comments")).then(function (res) {
    commentsData = res.data;
  })["catch"](function (error) {
    console.log(error);
  });
} //3. 渲染入門推薦資料


function renderFoundationRecommond() {
  var commentScoreNum = getAverageScore();
  var resultScore = commentScoreNum[0];
  var commentNum = commentScoreNum[1];
  var starStr = combineCommentStar(resultScore); //newResultScore

  var itemNum1 = 0;
  var itemNum2 = 0;
  var itemNum3 = 0;
  var renderMaxNum = 6; //組各tab render HTML

  var basicStr = "";
  var freeStr = "";
  var cnStr = "";
  resourcesData.forEach(function (item, index) {
    if (item.level === "初階") {
      if (itemNum1 < renderMaxNum) {
        basicStr += combineResouorceItem(item, resultScore, starStr, commentNum);
        itemNum1 += 1;
      }
    }

    if (item.price === "免費") {
      if (itemNum2 < renderMaxNum) {
        freeStr += combineResouorceItem(item, resultScore, starStr, commentNum);
        itemNum2 += 1;
      }
    }

    item.lang.forEach(function (langItem) {
      if (langItem === "繁體中文") {
        if (itemNum3 < renderMaxNum) {
          cnStr += combineResouorceItem(item, resultScore, starStr, commentNum);
          itemNum3 += 1;
        }
      }
    });
  });

  if (foundation1Basic !== null) {
    document.title = resTopic;
    foundation1Basic.innerHTML = basicStr;
  }

  if (foundation2Free !== null) {
    document.title = resTopic;
    foundation2Free.innerHTML = freeStr;
  }

  if (foundation3CN !== null) {
    document.title = resTopic;
    foundation3CN.innerHTML = cnStr;
  }
}

function getAverageScore() {
  var scoreTotal = {}; //每筆資源評價 總分

  var resourceIdObj = {}; //每筆資源評價 筆數

  var resultScore = {}; //每筆資源 平均分數(星星數)

  commentsData.forEach(function (item) {
    if (resourceIdObj[item.resourceId] === undefined) {
      resourceIdObj[item.resourceId] = 1;
      scoreTotal[item.resourceId] = item.score;
    } else {
      resourceIdObj[item.resourceId] += 1;
      scoreTotal[item.resourceId] += item.score;
    }

    resultScore[item.resourceId] = (scoreTotal[item.resourceId] / resourceIdObj[item.resourceId]).toFixed(1);
  }); // console.log("resourceIdObj",resourceIdObj);
  // console.log("scoreTotal",scoreTotal);
  // console.log("resultScore",resultScore);

  return [resultScore, resourceIdObj];
} //4. 組星星字串


function combineCommentStar(resultScore) {
  //評論分數+星星+筆數 HTML
  var newResultScore = _objectSpread({}, resultScore);

  var resourceIdArr = Object.keys(newResultScore); //['1, '2, '3'] 

  var scoreArr = Object.values(newResultScore); //['4.0', '3.3', '4.5' ,'2.8'] 

  scoreArr.forEach(function (item, index) {
    var starStr = ""; //星星HTML String
    //星星數

    for (var i = 1; i <= item[0]; i++) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li>";
      newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
    } //半顆星星+空星星  


    if (item[2] <= 2) {
      for (var _i = 1; _i <= 5 - item[0]; _i++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li> ";
        newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
      }
    } else if (item[2] >= 3 && item[2] <= 7) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_half</span></li>";

      for (var _i2 = 1; _i2 <= 5 - item[0] - 1; _i2++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
      }

      newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
    } else if (item[2] >= 8) {
      starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star</span></li";

      for (var _i3 = 1; _i3 <= 5 - item[0] - 1; _i3++) {
        starStr += "<li><span class=\"material-icons material-icons-sharp fs-8\">star_outline</span></li>";
        newResultScore["".concat(resourceIdArr["".concat(index)])] = starStr;
      }
    }
  });
  return newResultScore;
} //5. 入門推薦組單一資源項目html


function combineResouorceItem(item, resultScore, starStr, commentNum) {
  if (item.imgUrl === "") {
    item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (resultScore[item.id] === undefined || starStr[item.id] === undefined || commentNum[item.id] === undefined) {
    return "\n    <div class=\"col-lg-2 col-md-4 col-6\">\n    <div>\n        <p class=\"text-center\">\n            <a href=\"./resource.html?id=".concat(item.id, "\" >\n            <img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></p>\n        <div class=\"p-2\">\n            <h4 class=\"fs-7 ellipsis\"><a href=\"./resource.html?id=").concat(item.id, "\" > ").concat(item.title, "</a></h4>\n            <div class=\"d-flex flex-wrap justify-content-between align-items-center\">                             \n                <span class=\"fs-8 text-gray\"> \u5C1A\u7121\u8A55\u50F9 </span>\n            </div>\n  \n        </div>\n    </div>\n    </div>\n    ");
  } else {
    return "\n      <div class=\"col-lg-2 col-md-4 col-6\">\n      <div>\n          <p class=\"text-center\">\n              <a href=\"./resource.html?id=".concat(item.id, "\" >\n              <img src=\"").concat(item.imgUrl, "\" alt=\"").concat(item.title, "\" onerror=\"this.src=./assets/images/resources_cover/noimgCover.jpg\"></a></p>\n          <div class=\"p-2\">\n              <h4 class=\"fs-7 ellipsis\"><a href=\"./resource.html?id=").concat(item.id, "\" > ").concat(item.title, "</a></h4>\n\n              <div class=\"d-flex flex-wrap justify-content-between align-items-center text-secondary\">\n                  <span class=\"fs-7 fw-bold me-lg-2\"> ").concat(resultScore[item.id], "</span>\n                  <ul class=\"d-flex align-items-center lh-1 me-lg-2\">\n                  ").concat(starStr[item.id], "\n                  </ul>                                \n                  <span class=\"fs-8\">(").concat(commentNum[item.id], ")</span>\n              </div>\n\n          </div>\n      </div>\n      </div>\n      ");
  }
}
/***************** 相關主題 ***************/


var relatedTopic = document.querySelector('.relatedTopic');

if (resTopic == "JavaScript") {
  relatedTopic.innerHTML = "\n  <div class=\"col\">\n    <div class=\"topicItem text-center my-2  p-3 rounded-3\">\n    <a href=\"./resource_list.html?topics=HTML/CSS\"><h4 class=\"fs-6 mb-0\">HTML/CSS</h4></a>\n    </div>\n  </div>";
} else if (resTopic == "HTML/CSS") {
  relatedTopic.innerHTML = "\n  <div class=\"col\">\n    <div class=\"topicItem text-center my-2  p-3 rounded-3\">\n    <a href=\"./resource_list.html?topics=JavaScript\"><h4 class=\"fs-6 mb-0\">JavaScript</h4></a>\n    </div>\n  </div>";
} else if (resTopic == "Python") {
  document.querySelector('.relatedContainer').setAttribute("class", "d-none");
}
/***************** 資源篩選 ***************/


var resourceItem = document.querySelector('.resourceItem');
var filterItemInput = document.querySelectorAll('.filterItem > input');
var checkObj = {};
var renderList = [];
var newSortRenderList = []; // checked 監聽 : 取得 checked 清單的關鍵字 + render

filterItemInput.forEach(function (item, index) {
  item.addEventListener("change", function (e) {
    var filterKeyword = item.getAttribute("name");
    var groupName = item.getAttribute("data-group"); // console.log(filterKeyword,groupName);

    if (e.target.checked) {
      if (checkObj[groupName] === undefined) {
        checkObj[groupName] = [];
        checkObj[groupName].push(filterKeyword);
      } else {
        checkObj[groupName].push(filterKeyword);
      }
    } else {
      checkObj[groupName] = checkObj[groupName].filter(function (item) {
        return filterKeyword != item;
      });

      if (checkObj[groupName].length === 0) {
        delete checkObj[groupName];
      }
    }

    renderList = resourcesData.filter(function (resItem) {
      var hasType = true;
      var hasLevel = true;
      var hasPrice = true;
      var checkLang = true;

      if (checkObj.type) {
        hasType = checkObj.type.includes(resItem.type);
      }

      if (checkObj.level) {
        hasLevel = checkObj.level.includes(resItem.level);
      }

      if (checkObj.price) {
        hasPrice = checkObj.price.includes(resItem.price);
      }

      checkLang = resItem.lang.some(function (str) {
        //console.log(str);
        if (!checkObj.lang) {
          return true;
        }

        return checkObj.lang.includes(str);
      });
      return hasType && hasLevel && hasPrice && checkLang;
    });
    renderFilterResultList();
  });
});
var sortList = [];

function renderFilterResultList() {
  //render前 先排序
  var commentScoreNum = getAverageScore();
  var resultScore = commentScoreNum[0];
  var commentNum = commentScoreNum[1];
  var starStr = combineCommentStar(resultScore);
  var renderfilterStr = "";

  if (renderList.length === 0) {
    sortList = sortResourcesList(resourcesData);
    sortList.forEach(function (renderItem) {
      renderfilterStr += combineResouorceItemType2(renderItem, resultScore, starStr, commentNum);
    });

    if (resultNumber !== null) {
      resultNumber.setAttribute("class", "d-none");
    }

    if (clearBtnText !== null) {
      clearBtnText.setAttribute("class", "d-none");
    }

    if (checkObj.type !== undefined || checkObj.level !== undefined || checkObj.price !== undefined || checkObj.lang !== undefined) {
      renderfilterStr = "沒有符合條件的項目";
    }
  } else {
    if (resultNumber !== undefined) {
      resultNumber.setAttribute("class", "d-inline-block");
      resultNumber.textContent = "".concat(renderList.length, " \u500B\u7BE9\u9078\u7D50\u679C");
    }

    if (clearBtnText !== undefined) {
      clearBtnText.setAttribute("class", "d-inline-block");
    }

    if (checkObj.type == undefined && checkObj.level == undefined && checkObj.price == undefined && checkObj.lang == undefined) {
      resultNumber.setAttribute("class", "d-none");
      clearBtnText.setAttribute("class", "d-none");
    }

    sortList = sortResourcesList(renderList);
    sortList.forEach(function (renderItem) {
      renderfilterStr += combineResouorceItemType2(renderItem, resultScore, starStr, commentNum);
    });
  }

  if (resourceItem !== null) {
    resourceItem.innerHTML = renderfilterStr;
  }
}

function combineResouorceItemType2(renderItem, resultScore, starStr, commentNum) {
  if (renderItem.imgUrl === "") {
    renderItem.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
  }

  if (resultScore[renderItem.id] === undefined || starStr[renderItem.id] === undefined || commentNum[renderItem.id] === undefined) {
    return "<div class=\"row my-3 \">\n    <div class=\"col-2 \">\n      <a href=\"./resource.html?id=".concat(renderItem.id, "\" ><img src=\"").concat(renderItem.imgUrl, "\" alt=\"").concat(renderItem.title, "\"></a>\n    </div>\n      <div class=\"col-6\">\n          <h4 class=\"fs-7\"><a href=\"./resource.html?id=").concat(renderItem.id, "\" >").concat(renderItem.title, "</a></h4>\n          <div class=\"d-flex flex-wrap align-items-center\">\n              <span class=\"fs-8 text-gray fw-bold me-lg-2\"> \u5C1A\u7121\u8A55\u50F9</span>\n             \n          </div>\n      </div>\n      <div class=\"col-4\">\n          <div class=\"d-flex flex-column flex-lg-row  align-items-end\">\n              <a href=\"").concat(renderItem.url, "\" target=\"_blank\" role=\"button\" class=\"btn btn-tiffany my-2 w-75 mx-2\">\u524D\u5F80\u8CC7\u6E90</a>\n              <a href=\"./resource.html?id=").concat(renderItem.id, "\"  role=\"button\" class=\"btn btn-yellowBrown my-2 w-75 mx-2\">\u67E5\u770B\u5167\u5BB9</a>\n          </div>\n      </div>\n    </div>");
  } else {
    return "<div class=\"row my-3 \">\n  <div class=\"col-2 \">\n     <a href=\"./resource.html?id=".concat(renderItem.id, "\" ><img src=\"").concat(renderItem.imgUrl, "\" alt=\"").concat(renderItem.title, "\"></a>  \n  </div>\n    <div class=\"col-6\">\n     <h4 class=\"fs-7\"><a href=\"./resource.html?id=").concat(renderItem.id, "\" >").concat(renderItem.title, "</a></h4>\n        <div class=\"d-flex flex-wrap align-items-center text-secondary\">\n            <span class=\"fs-7 fw-bold me-lg-2\"> ").concat(resultScore[renderItem.id], "</span>\n            <ul class=\"d-flex align-items-center lh-1 me-lg-2  \">\n            ").concat(starStr[renderItem.id], "\n            </ul>                                \n            <span class=\"fs-8\">(").concat(commentNum[renderItem.id], ")</span>\n           \n        </div>\n    </div>\n    <div class=\"col-4\">\n        <div class=\"d-flex flex-column flex-lg-row  align-items-end\">\n          <a href=\"").concat(renderItem.url, "\" target=\"_blank\" role=\"button\" class=\"btn btn-tiffany my-2 w-75 mx-2\">\u524D\u5F80\u8CC7\u6E90</a>\n          <a href=\"./resource.html?id=").concat(renderItem.id, "\"  role=\"button\" class=\"btn btn-yellowBrown my-2 w-75 mx-2\">\u67E5\u770B\u5167\u5BB9</a>\n        </div>  \n    </div>\n  </div>\n      ");
  }
}
/***************** n 筆結果 / 清除篩選  ***************/


var resultNumber = document.querySelector('.resultNumber');
var clearBtnText = document.querySelector('.clearBtnText');
var clearFilterBtn = document.querySelector('#clearFilterBtn');

if (clearFilterBtn !== null) {
  clearFilterBtn.addEventListener("click", function (e) {
    if (checkObj.type) {
      delete checkObj.type;
    }

    if (checkObj.level) {
      delete checkObj.level;
    }

    if (checkObj.price) {
      delete checkObj.price;
    }

    if (checkObj.lang) {
      delete checkObj.lang;
    }

    filterItemInput.forEach(function (item) {
      item.checked = false;
    });
    renderList = [];
    renderFilterResultList();
  });
}
/*********************** 排序 ***********************/


var resourceSort = document.querySelector('#resourceSort');

function sortResourcesList(resRenderList) {
  if (resourceSort !== null || resourceSort !== undefined) {
    if ((resourceSort === null || resourceSort === void 0 ? void 0 : resourceSort.value) == "heightRate") {
      var _resRenderList;

      resRenderList = (_resRenderList = resRenderList) === null || _resRenderList === void 0 ? void 0 : _resRenderList.sort(function (a, b) {
        return b.averageScore - a.averageScore;
      });
    } else if ((resourceSort === null || resourceSort === void 0 ? void 0 : resourceSort.value) == "new") {
      var _resRenderList2;

      resRenderList = (_resRenderList2 = resRenderList) === null || _resRenderList2 === void 0 ? void 0 : _resRenderList2.sort(function (a, b) {
        return b.id - a.id;
      });
    }
  }

  return resRenderList;
}

if (resourceSort !== null) {
  resourceSort.addEventListener("change", function (e) {
    renderFilterResultList();
  });
}
"use strict";

var signUpForm = document.querySelector('form.signUpForm'); //form

var signupLastName = document.querySelector('#signupLastName');
var signupfirstName = document.querySelector('#signupfirstName');
var signupMail = document.querySelector('#signupMail');
var signupPw = document.querySelector('#signupPw');
var signupPwConfirm = document.querySelector('#signupPwConfirm');
var signUpFormInputs = document.querySelectorAll('input.signupInput'); //input

var btnSignUp = document.querySelector('#btnSignUp');

function initSignup() {
  getUserList();
}

initSignup(); //驗證欄位內容

var constraints = {
  lastname: {
    presence: {
      message: "必填欄位"
    }
  },
  firstname: {
    presence: {
      message: "必填欄位"
    }
  },
  email: {
    presence: {
      message: "必填欄位"
    },
    email: {
      email: true,
      message: "請填寫正確的信箱格式"
    }
  },
  password: {
    presence: {
      message: "必填欄位"
    },
    length: {
      minimum: 5,
      message: "密碼長度請大於5"
    }
  },
  confirmpw: {
    presence: {
      message: "必填欄位"
    },
    equality: {
      attribute: "password",
      message: "與前者輸入密碼不同"
    }
  }
};
signUpFormInputs.forEach(function (item) {
  item.addEventListener("change", function (e) {
    item.nextElementSibling.textContent = '';
    var errors = validate(signUpForm, constraints);
    var result = usersData.filter(function (userItem) {
      return userItem.email === signupMail.value;
    });

    if (result.length !== 0) {
      document.querySelector('.email').textContent = "此帳號已存在";
    } else {
      document.querySelector('.email').textContent = "";
    } //有錯就呈現在畫面上


    if (errors) {
      Object.keys(errors).forEach(function (keys) {
        document.querySelector(".".concat(keys)).textContent = errors[keys][0].split(" ")[1];
      });
    }
  });
}); //取得用戶清單

var usersData = [];

function getUserList() {
  axios.get("http://localhost:3000/users").then(function (res) {
    usersData = res.data;
  })["catch"](function (err) {
    console.log(err);
  });
} //註冊 post


if (btnSignUp !== null) {
  btnSignUp.addEventListener("click", function (e) {
    e.preventDefault();

    if (signupLastName.value === "" || signupfirstName.value === "" || signupMail.value === "" || signupPw.value === "" || signupPwConfirm.value === "") {
      return;
    }

    signUpFormInputs.forEach(function (item) {
      if (item.nextElementSibling.textContent !== '') {
        console.log("有錯誤訊息");
        return;
      }
    });

    if (signupPw.value !== signupPwConfirm.value) {
      return;
    }

    axios.post("http://localhost:3000/users", {
      "lastName": signupLastName.value,
      "firstName": signupfirstName.value,
      "email": signupMail.value,
      "password": signupPw.value,
      "role": "user",
      "title": "",
      "experiences": "",
      "links": {
        "websiteUrl": ""
      }
    }).then(function (res) {
      Swal.fire({
        icon: 'success',
        title: '成功註冊',
        iconColor: "#4AA9B6",
        confirmButtonColor: "#4AA9B6",
        showConfirmButton: true
      });
      setTimeout(function () {
        location.href = "./login.html";
      }, 5000);
      console.log(res);
    })["catch"](function (err) {
      Swal.fire({
        icon: 'error',
        title: '連線有誤'
      });
      console.log(err);
    });
  });
}
"use strict";

function Ftime(timespan) {
  var dateTime = new Date(timespan * 1000);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var now = Date.parse(new Date()); //typescript轉換

  var milliseconds = 0;
  var timeSpanStr; //時間差

  milliseconds = now / 1000 - timespan; // < 1min

  if (milliseconds <= 60) {
    timeSpanStr = '剛剛';
  } // > 1min < 60min
  else if (60 < milliseconds && milliseconds <= 60 * 60) {
      timeSpanStr = Math.ceil(milliseconds / 60) + '分鐘前';
    } // >1hr < 24hr 
    else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小時前';
      } // >1day > 15day 
      else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
          timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
        } // > 1month < 12 month 
        else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12) {
            timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '個月前';
          } // > 1year
          else {
              timeSpanStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
            }

  return timeSpanStr;
} //  https://beltxman.com/1576.html
//# sourceMappingURL=all.js.map
