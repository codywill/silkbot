var fs = require('fs');
var path = require('path');

module.exports = {
  addFriend: addFriend,
  delFriend: delFriend,
  loadFriends: loadFriends,
  storeFriends: storeFriends,
  getProperties: getProperties,
  friend: friend,
  actions: actions
}

function actions(cmdObj, friends) {
  const cmd = cmdObj.command;
  if(cmd in friends) {
    return friends[cmd].message;
  } else {
    var action = getAction(cmd);
    if(action) {
      return action(cmdObj, friends);
    } else {
      return("what");
    }
  }
}

function getAction(cmd) {
  return {
    'twitch': getProperty,
    'bnet': getProperty,
    'add': actionAdd,
    'del': actionDel,
    'set': setProperty,
    'get': showProperty
  }[cmd];
}

function getProperty(obj, friends) {
  const user = friends[obj.user];
  const property = obj.command;
  if(user && user[property] != null) {
    if(property === 'twitch')
      return('http://www.twitch.tv/' + user.twitch);
    else
      return(user[property]);
  } else {
    return("¯\\\_(ツ)\_/¯");
  }
}
function actionAdd(obj, friends) {
  const user = obj.user;
  const file = obj.file;
  let args = obj.args;
  if(user in friends) {
    if((args.constructor === Array) && (args.length > 1)) {
      const target = args.splice(0, 1);
      const twitch = args.splice(0, 1);
      const bnet = args.splice(0, 1);
      const message = args.join(" ");
      args = [twitch,bnet,message];
      addFriend(friends, target, ...args);
    } else {
      target = args;
      addFriend(friends, target);
    }
    storeFriends(friends, file);
    return(target + " is my newest friend :blue_heart:");
  } else {
    return("I DON'T KNOW YOU");
  }
}

function actionDel(obj, friends) {
  const user = obj.user;
  const file = obj.file;
  const args = obj.args;
  if(friends[user] && friends[user].role === "supervisor") {
    const target = args;
    if(target in friends) {
      delFriend(friends, target);
      storeFriends(friends, file);
      return(target + " is dead to me :broken_heart:");
    } else {
      return(target + " means nothing to me");
    }
  } else {
    return("YOU'RE NOT MY SUPERVISOR");
  }
}

function setProperty(obj, friends) {
  const user = obj.user;
  const file = obj.file;
  let args = obj.args;
  const target = args[0];
  const property = args[1];
  args.splice(0,2);
  if(friends[user].role === 'supervisor') {
    if(target in friends) {
      switch(property) {
        case 'twitch':
          friends[target].twitch = args;
          return(target + "'s twitch ID set to '" + args + "'");
          break;
        case 'bnet':
          friends[target].bnet = args;
          return(target + "'s bnet set to " + args);
          break;
        case 'message':
          friends[target].message = args.join(" ");
          return(target + "'s message has been set to '" + args.join(" ") + "'");
          break;
        default:
          return("do you know what you're doing?");
          break;
      }
      storeFriends(friends, file);
    } else {
      return("that ain't my friend, buddy");
    }
  } else {
    return("YOU'RE NOT MY SUPERVISOR");
  }
}

function showProperty(obj, friends) {
  const args = obj.args;
  const target = args[0];
  const property = args[1];
  if(target in friends) {
    if(friends[target][property] === null) {
      return("¯\\\_(ツ)\_/¯");
    }
    switch(property) {
      case 'twitch':
        return("http://www.twitch.tv/" + friends[target].twitch);
        break;
      case 'bnet':
        return(target + "'s Battle.net ID is " + friends[target].bnet);
        break;
      case 'message':
        return(target + "'s message is '" + friends[target].message + "'");
        break;
      default:
        return("do you know what you're doing?");
        break;
    }
  } else {
    return("that ain't my buddy, guy");
  }
}

function loadFriends(json) {
  let list = {};
  const file = json;
  for(i in file) {
    addFriend(list, i, ...getProperties(file[i]));
  }
  return list;
}

function storeFriends(friends, file) {
  fs.writeFileSync(path.join(__dirname, file.toString()), JSON.stringify(friends), 'utf-8');
}

function addFriend(list, name, ...args) {
  if(!args.length) {
    list[name] = new friend;
  } else {
    list[name] = new friend(...args);
  }
}

function delFriend(list, name) {
  if(list[name]) {
    delete list[name];
  }
}

function getProperties(obj) {
  let array = [];
  for(i in obj) {
    if(obj.hasOwnProperty(i)) {
      array.push(obj[i]);
    }
  }
  return array;
}

function friend(twitch=null, bnet=null, message=null, role="buddy") {
  if(twitch == "null") {
      this.twitch = null;
  } else {
    this.twitch = twitch;
  }
  if(bnet == "null") {
      this.bnet = null;
  } else {
    this.bnet = bnet;
  }
  if(message == "null") {
      this.message = null;
  } else {
    this.message = message;
  }
  if(role == "null") {
      this.role = "buddy";
  } else {
    this.role = role;
  }
}