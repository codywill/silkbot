var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var vocab = require('./vocabulary');
var friendsList = './friends.json';

module.exports = {
    botMsg: botMsg,
    botRespond: botRespond,
    cmdObj: cmdObj
}

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        var obj = new cmdObj(channelID, user, cmd, friendsList, ...args);
        bot.sendMessage(botRespond(obj, vocab.actions));
     } else if (message == 'good bot') {
        bot.sendMessage({
            to: channelID,
            message: "good human"
        });
     }
});

function botMsg(to=null, message=null) {
    this.to = to;
    this.message = message;
}

function botRespond(cmdObj, actions) {
    return new botMsg(cmdObj.channel, actions(cmdObj, vocab.loadFriends(require(friendsList))));
}

function cmdObj(channel, user, command, file, ...args) {
    this.channel = channel;
    this.user = user.toLowerCase();
    this.command = command;
    this.file = file;
    this.args = args;
}