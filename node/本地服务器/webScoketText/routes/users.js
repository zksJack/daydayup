var express = require("express");
var expressWs = require("express-ws");
var router = express.Router();
expressWs(router);

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });
router
  .ws("/user", function (ws, req) {
    ws.send('connect to express server with WebSocket success')
    ws.on("message", function (msg) {
      // 业务代码
      console.log(`receive message ${msg}`);
      ws.send("default response");
    });
    // 设置定时发送消息
    let timer = setInterval(() => {
      ws.send(`interval message ${new Date()}`);
    }, 2000);
    // close 事件表示客户端断开连接时执行的回调函数
    ws.on("close", function (e) {
      console.log("close connection");
      clearInterval(timer);
      timer = undefined;
    });
  })
  .get("/user", function (req, resp) {
    resp.send("respond with a resource");
  })
  .post("/user", function (req, resp) {});

module.exports = router;
