function formatDate() {
    var d = new Date();
   
    var year = d.getFullYear().toString();
    var month = (d.getMonth() + 1).toString();
    month = month.length == 2 ? month : "0" + month; // 月份，2位數
    var date = d.getDate().toString();
    date = date.length == 2 ? date : "0" + date; // 日期，2位數
    var hour = d.getHours().toString();
    hour = hour.length == 2 ? hour : "0" + hour; // 小時，2位數
    var minute = parseInt(d.getMinutes() / 5) * 5;
    minute = minute.toString();
    minute = minute.length == 2 ? minute : "0" + minute; // 分鐘
    var second = parseInt(d.getSeconds() / 5) * 5;
    second = second.toString();
    second = second.length == 2 ? second : "0" + second; // 秒
  
    var date_format_str = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
   
    return date_format_str; // 返回格式化的時間字符串，包含秒
  }

  module.exports = {formatDate};