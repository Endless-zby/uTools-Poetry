const  redisDb = {};
const redis = require("redis");
const client = redis.createClient('6379', '172.16.192.211');

client.on('error',function (err) {
  console.error('redis error：'+err);
});

client.on('connect',function () {
  console.info('redis连接成功...')
});

/**
 *
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 */
redisDb.set = function (dbNum,key,value,expire,callback) {
  client.select(dbNum,function (err) {
    if (err){
      console.error('redis set 选库失败：'+err);
    }else {
      client.set(key,value,function (err,result) {
        if (err){
          console.error('redis插入失败：'+err);
          callback(err,null);
          return
        }
        if (!isNaN(expire) && expire>0){
          client.expire(key, parseInt(expire));
        }
        callback(null,result);
      })
    }

  })
};

redisDb.get = function (dbNum,key,callback) {
  client.select(dbNum,function (err) {
    if (err){
      console.error('redis get 选库失败：'+err);
    }else {
      client.get(key,function (err,result) {
        if (err){
          console.error('redis获取失败：'+err);
          callback(err,null);
          return
        }
        callback(null,result);
      })
    }
  })
};

module.exports = redisDb;
