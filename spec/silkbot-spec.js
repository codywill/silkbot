const bot = require('../silkbot');

describe("botMsg", function() {
  it("should return a message object with specific channel ID", function() {
    const channel = '1234';
    const message = 'test message';
    const expected = {
      to: '1234',
      message: 'test message'
    }
    var msg = new bot.botMsg(channel, message);
    expect(JSON.stringify(msg)).toBe(JSON.stringify(expected));
  });
});

describe("botRespond", function() {
  function actions(cmdObj) {
    var cmd = cmdObj.command;
    var user = cmdObj.user;
    switch(cmd) {
      case "silk":
        return "classic " + cmd;
        break;
      default:
        return("i don't know what " + cmd + " means");
        break;
    }
  };
  it("should return the correct message object given a matching command", function() {
    const command = new bot.cmdObj("1234", "user", "silk");
    const expected = {
      to: "1234",
      message: "classic silk"
    }
    expect(JSON.stringify(bot.botRespond(command, actions))).toBe(JSON.stringify(expected));
  });
  it("should return the correct message object given an unknown command", function() {
    const command = new bot.cmdObj("1234", "user", "siafdslk");
    const expected = {
      to: "1234",
      message: "i don't know what " + command.command + " means"
    }
    expect(JSON.stringify(bot.botRespond(command, actions))).toBe(JSON.stringify(expected));
  });
});