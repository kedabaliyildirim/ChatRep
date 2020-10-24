const { model } = require('mongoose');
const redis = require('redis');


const getClient = () => {
    return redis.createClient({
        host:REDIS_URL,
        port:REDIS_PORT
    })
}


module.exports.getClient = getClient;