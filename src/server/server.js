let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

	 let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);

//Maps id to User object
	let userslist = {
	  a: {
	    id: "a",
	    nickname: "Chris",
	    avatar: "https://i.imgur.com/6KWn4Kg.jpg"
	  }

	};

	let postslist = {
	  a: {
	    a: {
	      id: "a",
	      user: userslist["a"],
	      caption: "Moving the community!",
	      image: "https://i.imgur.com/SWyyhY3.jpg"
	    },
	    b: {
	      id: "b",
	      user: userslist["a"],
	      caption: "Angular Book :)",
	      image:
	        "https://i.imgur.com/G11fKE4.jpg?1"
	    },
	    c: {
	      id: "c",
	      user: userslist["a"],
	      caption: "Me at Frontstack.io",
	      image: "https://i.imgur.com/OYmL85I.jpg?1"
	    },
	    d: {
	      id: "d",
	      user: userslist["a"],
	      caption: "Moving the community!",
	      image: "https://i.imgur.com/q4AQBna.jpg"
	    }
	  }
	};
	
//Pusher
let pusher = new Pusher({
  appId: 'PUSHER_APP_ID',
  key: 'PUSHER_APP_KEY',
  secret: 'PUSHER_APP_SECRET',
  cluster: 'PUSHER_CLUSTER',
  encrypted: true
});

//Add Middleware
let multipartMiddleware = new Multipart();

//trigger add a new post
app.post('/newpost', multipartMiddleware, (req,res) => {
	//create a sample post
	let post = {
		user: {
			nickname : req.body.name,
			avatar : req.body.avatar
		},
		image : req.body.image,
		caption : req.body.caption
	}

	//trigger pusher event
	pusher.trigger("posts-channel", "new-post", {
		post
	});

	return res.json({status : "Post created"});
});

//The root provides a resolver function fo reach API endpoint
	let root = {
	  user: function({ id }) {
	    return userslist[id];
	  },
	  post: function({ user_id, post_id }) {
	    return postslist[user_id][post_id];
	  },
	  posts: function({ user_id }) {
	    return Object.values(postslist[user_id]);
	  }
	};
    
	let app = express();
    app.use(cors());
	app.use(
	  "/graphql",
	  graphqlHTTP({
	    schema: schema,
	    rootValue: root,
	    graphiql: true
	  })
	);
	//set application port
	app.listen(4000);