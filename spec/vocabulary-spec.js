const vocab = require('../vocabulary');

describe("actions", function() {
   const friends = {
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
       let obj = {
           channel: "1234",
           user: "thisguy",
           command: "twitch"
       };
       expect(vocab.actions(obj, friends)).toBe("http://www.twitch.tv/thisguy");
       obj.user = "thatguy";
       expect(vocab.actions(obj, friends)).toBe("¯\\\_(ツ)\_/¯");       
       obj.user = "random";
       expect(vocab.actions(obj, friends)).toBe("¯\\\_(ツ)\_/¯");
   });
   it("should return bnet ID of known friend, message if unknown", function() {
       let obj = {
           channel: "1234",
           user: "thisguy",
           command: "bnet"
       };
       expect(vocab.actions(obj, friends)).toBe(friends.thisguy.bnet);
       obj.user = "thatguy";
       expect(vocab.actions(obj, friends)).toBe("¯\\\_(ツ)\_/¯");
       obj.user = "random";
       expect(vocab.actions(obj, friends)).toBe("¯\\\_(ツ)\_/¯");
   });
   it("should return new friend message and add to list if friend", function() {
       let obj = {
           channel: "1234",
           user: "thisguy",
           command: "add",
           file: "./spec/friendsTest.json",
           args: "newguy"
       };
       const expected = {
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
       let obj = {
           channel: "1234",
           user: "thisguy",
           command: "del",
           file: "./spec/friendsTest.json",
           args: "newguy"
       };
       const expected = {
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
       let obj = {
           channel: "1234",
           user: "thisguy",
           command: "set",
           file: "./spec/friendsTest.json",
           args: ["thatguy", "twitch", "thatguy"]
       };
       expect(vocab.actions(obj, friends)).toBe("thatguy's twitch ID set to 'thatguy'");
       obj.user = "thatguy";
       obj.args = ["thisguy", "twitch", null]
       expect(vocab.actions(obj, friends)).toBe("YOU'RE NOT MY SUPERVISOR");
   });
   it("should return get message", function() {
       const obj = {
           channel: "1234",
           user: "thisguy",
           command: "get",
           file: "./spec/friendsTest.json",
           args: ["thatguy", "twitch"]
       };
       expect(vocab.actions(obj, friends)).toBe("http://www.twitch.tv/thatguy");
   });
});


describe("addFriend", function() {
  it("should add a user to friends list", function() {
    let friends = {
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
    let friends = {
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


describe("loadFriends", function() {
  it("should load friends object from json file", function() {
    const file = require('./friendsTest.json');
    const expected = vocab.loadFriends(file);
    expect(JSON.stringify(file)).toBe(JSON.stringify(expected));
  });
});

describe("storeFriends", function() {
  it("should store friends object as json file", function(){
    const filename = './spec/friendsTest.json';
    const file = require('./friendsTest.json');
    let expected = vocab.loadFriends(file);
    vocab.storeFriends(expected, filename);
    expected = vocab.loadFriends(file);
    expect(JSON.stringify(file)).toBe(JSON.stringify(expected));
  });
});

describe("getProperties", function() {
  it("should return array of object properties", function() {
    const obj = {
      "a":{"twelve":12,"seven":7},
      "b":2
    };
  expect(JSON.stringify(vocab.getProperties(obj))).toBe(JSON.stringify([{"twelve":12,"seven":7}, 2]));
  });
});