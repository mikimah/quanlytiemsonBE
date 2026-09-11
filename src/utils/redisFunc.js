const redis = require('../configs/redis');


const redisFunc = {
  setCache,
  getCache,
  deleteCache
}

async function setCache(key, value) {

    await redis.set(key, JSON.stringify(value));
    return redis.expire(key, process.env.REDIS_EXPIRES_IN);
}

function getCache(key) {
  return redis.get(key).then((data) => {
      if (data) {
          return JSON.parse(data);
      }
      return null;
  });
  

}

function deleteCache(key) {
  return redis.del(key);
  
}

module.exports = redisFunc;