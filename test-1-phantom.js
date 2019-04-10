//system args for creating files
var system = require('system');
var args = system.args;
var PAGE_WIDTH = 1280;
var PAGE_HEIGHT = 900;
var pageNumber = args[1];

var URLS = [
"https://youtube.com",
"https://baidu.com",
"https://yahoo.com",
"https://taobao.com",
"https://tmall.com",
"https://yandex.ru",
"https://jd.com",
"https://sina.com.cn",
"https://weibo.com",
"https://csdn.net",
"https://yahoo.co.jp",
"https://mail.ru",
"https://twitch.tv",
"https://aliexpress.com",
"https://pages.tmall.com",
"https://alipay.com",
"https://microsoft.com",
"https://stackoverflow.com",
"https://github.com"
];


// phantomjs page object and helper flag
var page = require('webpage').create(),
loadInProgress = false,
pageIndex = args[1] * 5;


// set clip and viewport based on PAGE_WIDTH and PAGE_HEIGHT constants
if (PAGE_WIDTH > 0 && PAGE_HEIGHT > 0) {
 page.viewportSize = {
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT
 };

 page.clipRect = {
  top: 0,
  left: 0,
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT
 };
}

// page handlers
page.onLoadStarted = function() {
 loadInProgress = true;
 console.log('page ' + (pageIndex + pageNumber) + ' load started');
};


page.onLoadFinished = function() {
 loadInProgress = false;
 page.render("imagesBatch3/output" + (pageIndex + pageNumber )+ args[2] + ".png");
 console.log('page ' + (pageIndex + pageNumber) + ' load finished');
 pageIndex++;
};

// try to load/process a new page every 1000ms
setInterval(function() {
 if (!loadInProgress && pageIndex < args[1] * 5 + 5) {
  console.log("image " + (pageIndex + pageNumber));
  page.open(URLS[pageIndex]);
  console.log("pageIndex: " + pageIndex + " pageNumber: "+ pageNumber );
 }

 if (pageIndex == args[1] * 5 + 6) {
  console.log("image render complete!");
  phantom.exit();
 }
}, 1000);

console.log('from URL nr : ' + pageIndex + ' to URL nr' + (pageIndex + 5) );