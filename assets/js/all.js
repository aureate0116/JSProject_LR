"use strict";

/*****************swiper***************/
var swiper = new Swiper(".mySwiper", {
  //spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true
});
var swiper2 = new Swiper(".mySwiper2", {
  //spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  thumbs: {
    swiper: swiper
  }
});
/*****************nab tab***************/
//hover 切換
// const navItem = document.querySelectorAll(".goodRate .nav-link");
// const tabContent = document.querySelectorAll(".goodRate .tab-pane");
// console.log(navItem);
// console.log(tabContent);
// navItem.forEach((value,index)=>{
//   value.addEventListener('mouseover',(e)=>{
//     console.log("tt",e.target.getAttribute("id"));
//     let labelledby = tabContent[index].getAttribute("aria-labelledby");
//     //console.log(tabContent[index].classList);
//     if(e.target.getAttribute("id") == labelledby ){
//       //console.log("yes");
//       tabContent[index].classList.add("show");
//       console.log(tabContent[index].classList);
//     }
//   })
// })
//# sourceMappingURL=all.js.map
