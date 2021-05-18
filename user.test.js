const User = require("./user.js");

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  
test("viewing an empty wall returns nothing", () => {
    user = new User();
    expect(user.viewTimeline().length).toBe(0); 
});

test("after making a post, it is visible on the posting user's Timeline", () => {
    user = new User();
    user.publish("Blah");
    expect(user.viewTimeline()[0]).toContain("Blah");
})

test("when two posts are made, the Timeline displays them in reverse chronological order", () => {

    user = new User();
    user.publish("Blah");
    sleep(20);
    user.publish("Blah Blah");
    expect(user.viewTimeline()[0]).toContain("Blah Blah");
})


test("when a user is following another user, the followee's post appear on the the follower's wall", () => {

    let user1 = new User();
    let user2 = new User();
    
    user1.publish("User1's Post")
    user2.follow(user1);

    expect(user2.viewWall()[0]).toContain("User1's Post");
    
})

test("when a user is following two users, the followees' posts appear on the the follower's wall in reverse chronological order", () => {

    let follower = new User();
    let followee1 = new User();
    let followee2 = new User();
    
    followee1.publish("Followee1's Post");
    sleep(20);
    followee2.publish("Followee2's Post");

    follower.follow(followee1);
    follower.follow(followee2);


    expect(follower.viewWall()[0]).toContain("Followee2's Post");
    
})

test("fully-fleshed out Following example ripped from the Kata's readme", () => {

    let charlie = new User();
    let alice = new User();
    let bob = new User();

    alice.publish("I love the weather today");
    sleep(20);
    bob.publish("Darn! We lost!");
    sleep(40);
    bob.publish("Good game though.");
    sleep(50);
    charlie.publish("I'm in New York Today! Anyone wants to have a coffee?");
    sleep(30);

    charlie.follow(alice);
    charlie.follow(bob);

    expect(charlie.viewWall()[0]).toContain("I'm in New York Today! Anyone wants to have a coffee?");
    expect(charlie.viewWall()[1]).toContain("Good game though.");
    expect(charlie.viewWall()[2]).toContain("Darn! We lost!");
    expect(charlie.viewWall()[3]).toContain("I love the weather today");
})