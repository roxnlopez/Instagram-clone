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

	render = () => {
		return ( this.state.posts.map(post => <Post post={ post } />) )
	}
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