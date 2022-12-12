

function Ftime (timespan) {
    var dateTime = new Date(timespan * 1000);
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
   
    var now = Date.parse(new Date());  //typescript轉換
    var milliseconds = 0;
    var timeSpanStr;
    //時間差
    milliseconds = (now / 1000) - timespan;

    // < 1min
    if (milliseconds <= 60) {
        timeSpanStr = '剛剛';
    }
    // > 1min < 60min
    else if (60 < milliseconds && milliseconds <= 60 * 60) {
        timeSpanStr = Math.ceil((milliseconds / (60))) + '分鐘前';
    }
    // >1hr < 24hr 
    else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小時前';
    }
    // >1day > 15day 
    else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
    }
    // > 1month < 12 month 
    else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12){
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '個月前';
    }
    // > 1year
    else {
        timeSpanStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;   
    }
    return timeSpanStr;
}


//  https://beltxman.com/1576.html
