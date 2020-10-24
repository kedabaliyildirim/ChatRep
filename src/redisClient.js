const { model } = require('mongoose');
const redis = require('redis');


const getClient = () => {
    return redis.createClient({
        host:process.env.REDIS_URL
    })
}


module.exports.getClient = getClient;