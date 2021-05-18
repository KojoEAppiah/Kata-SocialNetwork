class User {
    constructor(){
        this.timeline = [];
        this.following = [];
        this.wall =[];
    }

    viewTimeline(){return this.timeline.reverse();};

    viewWall(){
        this.following.forEach(followee => 
            (followee.timeline.forEach(post => {
               if(!this.wall.includes(post)){
                    this.wall.push(post);
                }
            })
            )
        );

        this.wall.sort((post1, post2) => {return post2[1] - post1[1]})
        
        return this.wall;
    }

    publish(content){
        let newPost = [content, Date.now()];
        this.timeline.push(newPost);
        this.wall.push(newPost);
    }

    follow(userToFollow){
        this.following.push(userToFollow);
    }
}

module.exports = User;