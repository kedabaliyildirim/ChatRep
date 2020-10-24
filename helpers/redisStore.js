const redis = require ('redis');
const session =require ('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient =new redis.createClient({
    host:REDIS_URL,
    port:REDIS_PORT,
    pass:process.env.REDIS_PASS
}) 
module.exports= redisClient;