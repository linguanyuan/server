/*
 * @Description: 这是***页面（组件）
 * @Date: 2023-01-20 10:22:52
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 18:54:34
 */
import express from "express";
import connection from "../connect.js";
import { redisCacheAside, redisSet } from "../plugin/redis/RedisConfig.js";
import resultData from "../plugin/backData/resultData.js"

const router = express.Router();

// 添加user
router.post("/addUser", function (req, res) {
  console.log(req.body);
  const { name, sex, age } = req.body;
  // 接受普通键值对参数
  var captcha = svgCaptcha.create(codeConfig);
  // 添加到数据库中
  const sql = `insert into userdemo (name, sex, age) values ('${name}', '${sex}', '${age}')`;

  // 更改后状态
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.json({ msg: "添加失败", status: "999" });
    } else {
      console.log(err);
      res.json({ msg: "添加成功", status: "200" });
    }
    // res.status(200).send(res.json);
    res.end();
    return;
  });
});

// 获取user
router.get("/getUser", function (req, res) {
  const sql = `select * from userdemo`;
  let resultMsg = null;

  connection.query(sql, (err, result) => {
    if (err) {
      resultMsg = { msg: "获取失败", status: "999" };
      res.json(resultMsg);
    } else {
      resultMsg = { msg: "获取成功", code: "200", data: result };
      res.status(200).json(resultMsg);
    }
    res.end();
    return;
  });
});

const smsCallBack = (data, res) => {
  const mockData = "777777";
  console.log(data, "phoneData");
  redisSet(data, mockData, 60).then((reply) => {
    console.log(reply, "reply");
  });
  res.status(200).send({ mockData });
  res.end();
};

/**
 * 获取验证码
 */
router.post("/userSms", (req, res) => {
  const phone = req.body.phone;
  redisCacheAside(phone, res, smsCallBack);
});

//导出该路由
export default router;
