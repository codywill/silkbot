var fs = require('fs');

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
  var cmd = cmdObj.command;
  var user = cmdObj.user;
  var args = cmdObj.args;
  if(user in friends) {
    if(cmd in friends) {
      return friends[cmd].message;
    }
    switch(cmd) {
      case 'twitch':
        if (friends[user].twitch != null) {
          return('http://www.twitch.tv/' + friends[user].twitch);
        } else {
          return("¯\\\_(ツ)\_/¯");
        }
        break;
      case 'bnet':
        if(friends[user].bnet != null) {
          return(friends[user].bnet);
        } else {
          return("¯\\\_(ツ)\_/¯");
        }
        break;
      case 'add':
        var target;
        var twitch;
        var bnet;
        var message;
        if((args.constructor === Array) && (args.length > 1)) {
          target = args.splice(0, 1);
          twitch = args.splice(0, 1);
          bnet = args.splice(0, 1);
          message = args.join(" ");
          args = [twitch,bnet,message];
          addFriend(friends, target, ...args);
        } else {
          target = args;
          addFriend(friends, target);
        }
        storeFriends(friends);
        return(target + " is my newest friend :blue_heart:");
        break;
      case 'del':
        if(friends[user].role === "supervisor") {
          var target = args;
          delFriend(friends, target);
          storeFriends(friends);
          return(target + " is dead to me :broken_heart:");
        } else {
          return("YOU'RE NOT MY SUPERVISOR");
        }
        break;
      case 'set': 
        var target = args[0];
        var property = args[1];
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
            storeFriends(friends);
          } else {
            return("that ain't my friend, buddy");
          }
        } else {
          return("YOU'RE NOT MY SUPERVISOR");
        }
        break;
      case 'get':
        var target = args[0];
        var property = args[1];
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
        break;
    }
  } else {
    return("I DON'T KNOW YOU");
  }
}

function loadFriends(list, json) {
  var list = list;
  var file = json;
  for(i in file) {
    addFriend(list, i, new friend(...getProperties(file[i])));
  }
  return list;
}

function storeFriends(obj) {
  fs.writeFile('./friends.json', JSON.stringify(obj), 'utf-8');
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
  var array = [];
  for(i in obj) {
    if(obj.hasOwnProperty(i)) {
      array.push(obj[i]);
    }
  }
  return array;
}

function friend(twitch=null, bnet=null, message=null, role="buddy") {
  this.twitch = twitch;
  this.bnet = bnet;
  this.message = message;
  this.role = role;
}