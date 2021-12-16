var express = require("express");
var router = express.Router();
let access = '';
const getAccess = () => {
    return access;
  };
/* GET home page. */
router.get('/currentUser', function(req, res, next) {
    if (!getAccess()) {
        res.status(401).send({
          data: {
            isLogin: false,
          },
          errorCode: '401',
          errorMessage: '请先登录！',
          status: false,
          ishint: false,
          model: 'user',
        });
        return;
      }
      res.send({
        status: true,
        model: 'user',
        data: {
          name: 'Serati Ma',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          email: 'antdesign@alipay.com',
          signature: '海纳百川，有容乃大',
          title: '交互专家',
          group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          tags: [
            {
              key: '0',
              label: '很有想法的',
            },
            {
              key: '1',
              label: '专注设计',
            },
            {
              key: '2',
              label: '辣~',
            },
            {
              key: '3',
              label: '大长腿',
            },
            {
              key: '4',
              label: '川妹子',
            },
            {
              key: '5',
              label: '海纳百川',
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          country: 'China',
          access: getAccess(),
          geographic: {
            province: {
              label: '浙江省',
              key: '330000',
            },
            city: {
              label: '杭州市',
              key: '330100',
            },
          },
          address: '西湖区工专路 77 号',
          phone: '0752-268888888',
        },
      });
  });
router.post('/account', function(req, res, next) {
    const { password, username, type } = req.body;
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        model: 'user',
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        model: 'user',
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        model: 'user',
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    res.send({
      model: 'user',
      ishint: false,
      status: 'error',
      type,
      currentAuthority: 'guest',
      errorCode: 'USER0001',
      errorMessage: '账号或密码错误',
    });
    access = 'guest';
  });
  router.post('/outLogin', function(req, res, next) {
    access = '';
    res.send({ data: {}, model: 'user', success: true });
  });
  module.exports = router;