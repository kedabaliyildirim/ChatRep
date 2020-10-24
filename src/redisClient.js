  
const redis = require('redis');


client = new redis.createClient({
    host:process.env.HEROKU_REDIS_ROSE_URL
})

const getClient = () => {
	return redis.createClient({
		host: process.env.HEROKU_REDIS_ROSE_URL,
		port: process.env.REDIS_PORT,
	});
};

module.exports.getClient = getClient;
module.exports = client