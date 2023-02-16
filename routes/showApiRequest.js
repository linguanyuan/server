// const ShowapiRequest = require('showapirequest_nodejs')
import ShowapiRequest from "showapirequest_nodejs";
import axios from "axios";
import qs from "qs";
import express from "express";

const router = express.Router();
//创建请求对象
const sdk = new ShowapiRequest(
  "https://route.showapi.com/28-1", //接口地址,注意需要先订购了相关套餐才能调
  "1326933", //替换为真实的appId
  "a65adaceef4d4b5cab36255fd0b2a3d9" //替换为真实的密钥
);

const sdkFun = () => {
  sdk
    .addTextPara("tNum", "")
    .addTextPara("mobile", "")
    .addTextPara("content", '{"code":"123456"}')
    .addTextPara(
      "big_msg",
      "【罐头鱼网络】注册帐号验证码：213181，本验证码6688分钟有效。如非本人操作请忽略。"
    )
    .post() //post方式发送请求，返回axios.post()的Promise
    .then((res) => {
      console.log('罐头鱼网络')
      // console.info("#####result:", res.data);
      // console.info("#######axios all response:", res);
    })
    .catch((error) => {
      console.error(error);
    });
};

// router.post("/showApiRequest", (req, res) => {
//     console.log("req", req.body);
//     // sdkFun()
//      res.status(200).send({msg: "获取成功", code: "200"});
//   });

// import sdkFun from "../routes/showApiRequest.js";

export default sdkFun;