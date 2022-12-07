// //1. 頁面初始化
// function init(){
//     getResources();
    
// }
// init();


// /****************好評推薦********************/
// const goodRate1 = document.querySelector('#goodRate1 > div.row');
// const goodRate2 = document.querySelector('#goodRate2 > div.row');
// const goodRate3 = document.querySelector('#goodRate3 > div.row');

// let resourcesData = [];
// let commentsData = [];

// //2. 取得資源資料
// function getResources(){
//   axios.get('./json/db.json')
//   .then(res=>{
//     resourcesData = res.data.resources;
//     commentsData = res.data.comments;
//     renderGoodRateList();
  
//   }).catch(error=>{
//     console.log(error);
//   })
// }

// //3. 渲染好評推薦資料
// function renderGoodRateList(){
//     let resultScore = getAverageScore();
//     let newResultScoreOjb = combineCommentStar(resultScore); //newResultScore
  
//     let tabJS ="";
//     let tabHtml="";
//     let tabPython="";
  
//     resourcesData.forEach( (item,index)=>{
//         switch (item.topic){
//             case "JavaScript" :
//                 tabJS += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);

//             case "HTML/CSS" :
//                 tabHtml += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);

//             case "Python" :
//                 tabPython += combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj);
//         }
//     })
//     goodRate1.innerHTML = tabJS;
//     //goodRate2.innerHTML = tabHtml;
//     //goodRate3.innerHTML = tabPython;
//     console.log(tabJS)
// }


// //計算分數
// let scoreTotal = {};  //每筆資源評價 總分
// let resourceIdObj = {}; //每筆資源評價 筆數
// let resultScore = {};  //每筆資源 平均分數(星星數)
// function getAverageScore(){
//   commentsData.forEach(item=>{
//       if(resourceIdObj[item.resourceId] === undefined){
//           resourceIdObj[item.resourceId] = 1;
//           scoreTotal[item.resourceId] = item.score;
          
//       }else{
//           resourceIdObj[item.resourceId] +=1;
//           scoreTotal[item.resourceId] += item.score;

//       }
//       resultScore[item.resourceId] = (scoreTotal[item.resourceId] /  resourceIdObj[item.resourceId]).toFixed(1);
//   })
//   return resultScore;
//   //console.log(resultScore);  //1: '4.0', 2: '3.3', 3: '4.5', 4: '2.8'}
// }


// //4. 組星星字串
// function combineCommentStar(resultScore){
//   //評論分數+星星+筆數 HTML
//   let newResultScore = {...resultScore};
//   let resourceIdArr = Object.keys(newResultScore);  //['1, '2, '3'] 
//   let scoreArr = Object.values(newResultScore); //['4.0', '3.3', '4.5' ,'2.8'] 

//   scoreArr.forEach((item,index)=>{
//     let starStr=""; //星星HTML String
//     //星星數
//     for(let i=1; i<=item[0] ;i++){
//       starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li>`;
//       newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
//     }
    
//     //半顆星星+空星星  
//       if(item[2]<=2){
//         for(let i=1; i<=(5-item[0]) ;i++){
//           starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li> `;
//           newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
//         }
        
//       }else if(item[2] >=3 && item[2] <=7){
//           starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_half</span></li>`;
//           for(let i=1; i<=(5-item[0]-1) ;i++){
//             starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
//           }
//           newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
       
//       }else if(item[2]>=8){
//           starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star</span></li`;
//         for(let i=1; i<=(5-item[0]-1) ;i++){
//           starStr+=`<li><span class="material-icons material-icons-sharp fs-8">star_outline</span></li>`;
//           newResultScore[`${resourceIdArr[`${index}`]}`] = starStr;
//         }
//       }

//   })
//   return newResultScore;
// }

// //5. 入門推薦組單一資源項目html
// function combineResouorceItem(item,index,resultScore,newResultScoreOjb,resourceIdObj){

//   if( item.imgUrl ===""){
//     item.imgUrl = "./assets/images/resources_cover/noimgCover.jpg";
//   }

//   if(resultScore[`${index+1}`]===undefined || newResultScoreOjb[item.id]=== undefined || resourceIdObj[`${index+1}`]=== undefined ){

//     return  `
//     <div class="col-lg-2 col-md-4 col-6">
//     <div>
//         <p class="text-center">
//             <a href="./resource.html" target="_blank">
//             <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"/></a></p>
//         <div class="p-2">
//             <h4 class="fs-7"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>
//             <div class="d-flex flex-wrap justify-content-between align-items-center">                             
//                 <span class="fs-8"> 尚無評價 </span>
//             </div>
  
//         </div>
//     </div>
//     </div>
//     `;
//   }else{
//     return  `
//       <div class="col-lg-2 col-md-4 col-6">
//       <div>
//           <p class="text-center">
//               <a href="./resource.html" target="_blank">
//               <img src="${item.imgUrl}" alt="${item.title}" onerror="this.src=./assets/images/resources_cover/noimgCover.jpg"/></a></p>
//           <div class="p-2">
//               <h4 class="fs-7"><a href="${item.url}" target="_blank"> ${item.title}</a></h4>

//               <div class="d-flex flex-wrap justify-content-between align-items-center">
//                   <span class="fs-7 fw-bold me-lg-2"> ${resultScore[`${index+1}`]}</span>
//                   <ul class="d-flex align-items-center lh-1 me-lg-2">
//                   ${newResultScoreOjb[item.id]}
//                   </ul>                                
//                   <span class="fs-8">(${resourceIdObj[`${index+1}`]})</span>
//               </div>

//           </div>
//       </div>
//       </div>
//       `;
//   }
      
// }