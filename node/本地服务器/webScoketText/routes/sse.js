var express = require('express');
var router = express.Router();
var SseServer =require('./sseSever')
/* GET home page. */
const mySseServer = new SseServer(
    {
      maxConnections: 3, // 设置最大链接数量
    }
  )
router.get('/ss', mySseServer.middleWare());
setInterval(() => {
    // 当前链接的数量
    console.log('current connect number:', mySseServer.sseConnections.size);
    mySseServer.announce(`It is ${new Date()} now!`);
  }, 2000);

module.exports = router;
