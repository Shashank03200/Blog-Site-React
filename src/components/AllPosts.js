import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

import PostItem from './PostItem';
import classes from './AllPosts.module.css';

import AuthContext from '../store/auth-context';

const AllPosts = () => {

    const [posts, setPosts] = useState([]);
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        async function getAllPosts() {
            const response = await fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json');
            const posts = await response.json();
            return posts;
        }

        getAllPosts().then(posts => {
            const initialPosts = [];
            // data is the object posts
            for (const post in posts) {
                console.log('Fetching posts ')
                if (posts[post].userId === userId) {
                    const postObject = {
                        postId: post,
                        postData: posts[post]
                    }
                    initialPosts.push(postObject);
                }
            }
            console.log('Setting Posts');
            setPosts(initialPosts);
            console.log('New posts set');
        })
    }, [])


    console.log('setting posts to loading')
    let postList = <p>Loading...</p>
    if (posts.length > 0) {
        postList = (
            posts.map(post => {
                return (<PostItem key={post.postId} postData={post.postData} postId={post.postId} />)
            })
        )
    }

    return (
        <Container>
            {postList}
        </Container>
    );
}

export default AllPosts;