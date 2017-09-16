const vocab = require('../vocabulary');

/*// BACK UP FRIENDS LIST BEFORE ENABLING THESE TESTS
describe("actions", function() {
   var friends = {
      "thisguy": {
        "twitch": "thisguy",
        "bnet": "ThisGuy#1234",
        "message": null,
        "role": "supervisor"
      },
      "thatguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      }
   };
   it("should return twitch URL of known friend, message if unknown", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "twitch"
       };
       expect(vocab.actions(obj, friends)).toBe("http://www.twitch.tv/thisguy");
       obj.user = "thatguy";
       expect(vocab.actions(obj, friends)).toBe("/shrug");       
       obj.user = "random";
       expect(vocab.actions(obj, friends)).toBe("I DON'T KNOW YOU");
   });
   it("should return bnet ID of known friend, message if unknown", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "bnet"
       };
       expect(vocab.actions(obj, friends)).toBe(friends.thisguy.bnet);
       obj.user = "thatguy";
       expect(vocab.actions(obj, friends)).toBe("/shrug");
       obj.user = "random";
       expect(vocab.actions(obj, friends)).toBe("I DON'T KNOW YOU");
   });
   it("should return new friend message and add to list if friend", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "add",
           args: "newguy"
       };
       var expected = {
          "thisguy": {
            "twitch": "thisguy",
            "bnet": "ThisGuy#1234",
            "message": null,
            "role": "supervisor"
          },
          "thatguy": {
            "twitch": null,
            "bnet": null,
            "message": null,
            "role": "buddy"
          },
          "newguy": {
            "twitch": null,
            "bnet": null,
            "message": null,
            "role": "buddy"
          }
       };
       expect(vocab.actions(obj, friends)).toBe("newguy is my newest friend :blue_heart:");
       expect(JSON.stringify(friends)).toBe(JSON.stringify(expected));
       obj.user = "random";
       expect(vocab.actions(obj, friends)).toBe("I DON'T KNOW YOU");
   });
   it("should return remove message and remove friend if supervisor", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "del",
           args: "newguy"
       };
       var expected = {
          "thisguy": {
            "twitch": "thisguy",
            "bnet": "ThisGuy#1234",
            "message": null,
            "role": "supervisor"
          },
          "thatguy": {
            "twitch": null,
            "bnet": null,
            "message": null,
            "role": "buddy"
          }
       };
       expect(vocab.actions(obj, friends)).toBe("newguy is dead to me :broken_heart:");
       expect(JSON.stringify(friends)).toBe(JSON.stringify(expected));
       obj.user = "thatguy";
       expect(vocab.actions(obj, friends)).toBe("YOU'RE NOT MY SUPERVISOR");
   });
   it("should return set message and set property if supervisor", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "set",
           args: ["thatguy", "twitch", "thatguy"]
       };
       expect(vocab.actions(obj, friends)).toBe("thatguy's twitch ID set to 'thatguy'");
       obj.user = "thatguy";
       obj.args = ["thisguy", "twitch", null]
       expect(vocab.actions(obj, friends)).toBe("YOU'RE NOT MY SUPERVISOR");
   });
   it("should return get message", function() {
       var obj = {
           channel: "1234",
           user: "thisguy",
           command: "get",
           args: ["thatguy", "twitch"]
       };
       expect(vocab.actions(obj, friends)).toBe("http://www.twitch.tv/thatguy");
   });
});
*/

describe("addFriend", function() {
  it("should add a user to friends list", function() {
    var friends = {
    };
    const expected = {
      "thisguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      },
      "thatguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      }
    };
    vocab.addFriend(friends, "thisguy");
    vocab.addFriend(friends, "thatguy");
    expect(JSON.stringify(friends)).toBe(JSON.stringify(expected));
  });
});

describe("delFriend", function() {
  it("should remove a friend from friends list", function() {
    var friends = {
      "thisguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      },
      "thatguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      }
    };
    const expected = {
      "thatguy": {
        "twitch": null,
        "bnet": null,
        "message": null,
        "role": "buddy"
      }
    };
    vocab.delFriend(friends, "thisguy");
    expect(JSON.stringify(friends)).toBe(JSON.stringify(expected));
  });
});

/*
describe("loadFriends", function() {
  it("should load friends object from json file", function() {
    var file = require('../friends.json');
    vocab.loadFriends(file);
    var expected = vocab.getFriends();
    expect(JSON.stringify(file)).toBe(JSON.stringify(expected));
  });
});

describe("storeFriends", function() {
  it("should store friends object as json file", function(){
    var friends = vocab.getFriends();
    vocab.storeFriends(friends);
  });
});
*/

describe("getProperties", function() {
  it("should return array of object properties", function() {
    var obj = {
      "a":"twelve",
      "b":2
    };
    expect(JSON.stringify(vocab.getProperties(obj))).toBe(JSON.stringify(["twelve", 2]));
  });
});
/*
describe("addCmd", function() {
  it("should add a command object to specified vocabulary", function() {
    var testVocab = {
      'dummycmd': 'dummy response'
    }
    const cmdObj = {
      command: 'newtestcmd',
      response: 'new test response'
    }
    var expectedVocab = {
      'dummycmd': 'dummy response',
      'newtestcmd': 'new test response'
    }
    bot.addCmd(cmdObj, testVocab);
    expect(testVocab).toBe(expectedVocab);
  });
});
*/