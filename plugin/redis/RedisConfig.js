/*
 * @Description: 这是redis封装方法（组件）
 * @Date: 2023-02-03 10:57:30
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 19:25:59
 */
import redis from "redis";
import redisOptions from "./RedisOptions.js";
import resultData from "../backData/resultData.js";

const options = {
  host: redisOptions.host,
  port: redisOptions.port,
  password: redisOptions.password,
  detect_buffers: redisOptions.detect_buffers, // 传入buffer 返回也是buffer 否则会转换成String
  retry_strategy: function (options) {
    // 重连机制
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
};

// 生成redis的client
const redisClient = redis.createClient(options); // Redis server started at port 6379

/**
 * 设置值,并设置过期时间
 * @param {String} key 键
 * @param {String} value 值(Object请使用JSON.stringify()包裹)
 * @param {Number} expire 过期时间(单位: 秒)
 */
const redisSet = (key, value, expire) =>
  new Promise((resolve, reject) => {
    // client.auth(password);
    if (typeof value === "string") {
      redisClient.set(key, value, (err, reply) => {
        if (err) throw err;
        else resolve(reply);
      });
    } else if (typeof value === "object") {
      for (let item in value) {
        redisClient.hmset(key, item, value[item], redis.print);
      }
    }

    redisClient.expire(key, expire); // expire 过期时间(秒)
  });

// 获取值
const redisGet = (key) =>
  new Promise((resolve, reject) => {
    redisClient.get(key, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

// 获取hash
const redisGetHValue = (key) =>
  new Promise((resolve, reject) => {
    redisClient.hgetall(key, function (err, value) {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });

// Cache-aside 执行流
const redisCacheAside = (key, res, callBack) => {
  try {
    redisClient.get(key, (err, data) => {
      if (err) {
        console.error(err);
        throw err;
      }

      if (data) {
        console.log(data, "User successfully retrieved from Redis", key);
        let result = null;
        typeof data === "string"
          ? (result = { [key]: data })
          : (result = data);
        res.status(200).send(resultData.success(result));
      } else {
        console.error("callBack");
        callBack(key, res);
      }
    });
  } catch (err) {
    console.error("500");
    res.status(500).send({ error: err.message });
  }
};

export { redisSet, redisGet, redisGetHValue, redisCacheAside };
