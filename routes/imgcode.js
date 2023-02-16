/*
 * @Description: 这是路由（组件）
 * @Date: 2022-09-23 14:18:29
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-02 15:48:32
 */
import express from 'express'
import svgCaptcha from 'svg-captcha'

const router = express.Router(); //调用函数
//创建路由实例，我们可以在该实例上自由的添加路由

// 获取图片验证码
router.get("/imgcode", function (req, res) {
  var codeConfig = {
    size: 4, // 验证码长度
    ignoreChars: "0o1i", // 验证码字符中排除 0o1i
    noise: 5, // 干扰线条的数量
    height: 40,
    inverse: false,
    fontSize: 40,
    color: true,
  };
  var captcha = svgCaptcha.create(codeConfig);
  // console.log(captcha);
  // req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
  // console.log("captcha.text.toLowerCase()", captcha.text.toLowerCase());
  // console.log(req.session.captcha);

  res.type("svg");
  res.status(200).send(captcha.data);
  // res.status(200).json({
  //   err_code: 0,
  //   message: "OK",
  //   img: captcha.data,
  // });
  res.end();
});

//导出该路由
export default router;
