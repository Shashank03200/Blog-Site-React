import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

import PostItem from './PostItem';
import classes from './AllPosts.module.css';

import AuthContext from '../store/auth-context';

const AllPosts = () => {

    let posts = []
    const { userId } = useContext(AuthContext);



    useEffect(() => {
        fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json')
            .then(response => response.json())
            .then(posts => {
                const initialPosts = [];
                // data is the object posts
                for (const post in posts) {

                    if (posts[post].userId === userId) {
                        const postObject = {
                            postId: post,
                            postData: posts[post]
                        }
                        initialPosts.push(postObject);
                    }
                }
                console.log(initialPosts)
                posts = initialPosts;
            })
    }, [posts])


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