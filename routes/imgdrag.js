/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-09-27 10:28:48
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-02 15:47:54
 */
import Canvas from 'canvas'
import path from 'path'
import express from 'express'

const router = express.Router();

// 背景图片的宽可以传参设置，默认值是320 * 180，小拼图默认是60 * 45
router.get("/drag_captcha", (req, res) => {
  const { bgWidth: width } = req.query;
  const bgWidth = parseInt(width) || 320;
  const bgHeight = (width && parseInt((width * 180) / 320)) || 180;
  const dragPicWidth = 60;
  const dragPicHeight = 45;
  const index = 0;
  const positionX = Math.floor(
    Math.random() * (bgWidth - dragPicWidth - 10) + 11
  ); // 空白拼图的定位X
  const positionY = Math.floor(
    Math.random() * (bgHeight - dragPicHeight - 10) + 11
  );
  const Image = Canvas.Image;
  const bgCanvas = Canvas.createCanvas(bgWidth, bgHeight);
  const dragCanvas = Canvas.createCanvas(dragPicWidth, dragPicHeight);
  const background = bgCanvas.getContext("2d");
  const dragPic = dragCanvas.getContext("2d");

  const image = new Image();
  image.src = path.join(__dirname, `../pubilc/assets/bg-${index + 1}.jpg`);
  image.onload = () => {
    background.drawImage(image, 0, 0, 320, 180, 0, 0, bgWidth, bgHeight);
    dragPic.drawImage(
      bgCanvas,
      positionX,
      positionY,
      dragPicWidth,
      dragPicHeight,
      0,
      0,
      dragPicWidth,
      dragPicHeight
    );
    background.clearRect(positionX, positionY, dragPicWidth, dragPicHeight);
  };

  if (req.session) {
    req.session.dragCaptcha = {
      positionX,
      positionY,
    };
  }

  res.send({
    bgCanvas: background.canvas.toDataURL('image/jpg'),
    dragCanvas: dragPic.canvas.toDataURL('image/jpg'),
  });
});

router.post("/check_captcha_position", (req, res) => {
  console.log("req", req.body);
  const { offsetLeft, offsetTop } = req.body;
  const { dragCaptcha = {} } = req.session;
  const range = 5; // 误差范围
  if (!offsetLeft || !offsetTop) return;
  console.log(dragCaptcha.positionX, dragCaptcha.positionY);

  const deviationX = Math.abs(offsetLeft - dragCaptcha.positionX);
  const deviationY = Math.abs(offsetTop - dragCaptcha.positionY);
  if (deviationX < range && deviationY < range) {
    res.send({ error: false });
  } else {
    res.send({ error: true });
  }
});

export default router;