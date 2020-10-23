const redisClient = require('../redisClient');
const redis       = require('redis');
const shortId     = require('shortid');
const _           = require('lodash');

function Messages() {
    this.client = redisClient.getClient();
}
module.exports = new Messages();

Messages.prototype.upsert =function ({roomId, message, userId, name, surname})  {
    this.client.hset(
        'messages:' + roomId,
        shortId.generate(),
        JSON.stringify({
            userId,
            name,
            surname,
            message, 
            when: Date.now()
        }),
        err => {
            if(err) {
                console.log(err);
            }
        }
    )
}
Messages.prototype.list = function(roomId ,callback) {
    let history = [];

    this.client.hgetall('messages:'+ roomId, function(err, messages){
        if (err) {
            console.log(err);
            return callback([])
        }
        for (let message in messages) {
            history.push(JSON.parse(messages[message]));
        }
        return callback(_.orderBy(history, 'when', 'asc'));
    } )
};