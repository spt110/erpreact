/*** entry.js ***/
document.getElementById('app').innerHTML="这是我第一个打包成功的程序";
//添加
require("./first.js");
//如果每次 require CSS 文件的时候都要写 loader 前缀!style!css!这样的东西，显然是一件很麻烦的事情。我们需要它可以根据模块类型（扩展名）来自动绑定需要的 loader。
//require("!style!css!./style.css");
require("./style.css")