/*
 * @Description: 这是***页面（组件）
 * @Date: 2023-01-06 18:01:41
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-02 15:36:12
 */
import mysql from "mysql";
// const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "user",
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

//导出该路由
export default connection;