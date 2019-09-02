import React, { Component } from "react";
import "./Posts.css";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Post from "../Post";

class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}	

	componentDidMount = () => {
		//request permission
		Notification.requestPermission();

		this.props.apollo_client.query({query: gql`
	        {
	          posts(user_id: "a"){
	            id
	            user{
	              nickname
	              avatar
	            }
	            image
	            caption
	          }
	        }
	      `})
		.then(({data}) => {
			console.log('me!', data.posts)
			this.setState({ posts: data.posts })
		})
	}

	//suscribe to posts channel
	this.posts_channel = this.props.pusher.suscribe('posts-channel');

	//listen for a new post
	this.posts_channel.bind("new-post", data => {
		//update states
		this.setState({ posts: this.state.posts.concat(data.post) });

		//check for notifications
		if(Notification.permission === 'granted'){
			try{
				//notify user of new post
				let notification = new Notification(
					'Pusher Instagram Clone',
					 {
					 	body: `New post from ${data.post.user.nickname}`,
					 	icon: 'https://img.stackshare.io/service/115/Pusher_logo.png',
					 	image: `${data.post.image}`
					 }
				);
				//open the website when the notification is clicked
				notification.onclick = function(event){
					window.open('http://localhost:3000','_blank');
				}
			} catch(e){
				console.log('Error displaying notification');
			}
		}
// 		}, this);
// }
	
	render = () => {
		return ( 
			<div className="Posts">
			this.state.posts
				.slice(0)
				.reverse()
				.map(post => (
					<Post 
					nickname={post.user.nickname} 
					avatar={post.user.avatar} 
					image={post.image} 
					caption={post.caption} 
					key={post.id}
					/>
					))}
			</div>
			</div>
		);	
	}	


export default Posts;


	//  return (
 //    <Query
	//       this.props.apollo_client.query({gql:`
	//         {
	//           posts(user_id: "a"){
	//             id
	//             user{
	//               nickname
	//               avatar
	//             }
	//             image
	//             caption
	//           }
	//         }
	//       `}
	//     >

	//     {({loading, error, data}) => {

	//     	if (loading) return <p>Loading Posts...</p>;
	//     	if (error) return <p>Error Fetching Posts...</p>;
	//     	let posts = data.posts;

	// 	    return (<div className="Posts">
	// 		      {posts.map(post => <Post nickname={post.user.nickname} avatar={post.user.avatar} image={post.image} caption={post.caption} key={post.id}/>)}
	// 		    </div>);
	// 		    }}
	// 	    </Query>
	// 	  	);  
	// }

 // }