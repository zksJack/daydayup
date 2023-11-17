// server.js
const http = require('http');
var express = require("express");
const JET_PACK = require('fs-jetpack');


const cors = require("cors");
var fs = require('fs');
var router = express.Router();
const hostname = '127.0.0.1';
const port = 3000;
const src = '../img';
const getFileChildList = (src) => {
   return fs.readdirSync(src);
}
//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
        default: 
            return 0; 
        break; 
    } 
} 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  });
var app = express();
app.use(cors()); //使用cors中间件
app.use('/a',router.get('/getFiles', function(req, res, next) {
    let list = getFileChildList(src);
    let lest100=[];
    for(let i=0;i<30; i++){
        lest100.push(list[randomNum(0,list.length-1)]);
    }
    JET_PACK.writeAsync('./data.json', JSON.stringify(lest100));
    res.send(lest100);
}));
app.use('/b',router.get('/getFiles', function(req, res, next) {
    let list = getFileChildList(src);
    res.send(list);
}));
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
