import { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

import Spinner from './Spinner';

import PostItem from './PostItem';
import classes from './AllPosts.module.css';

import AuthContext from '../store/auth-context';

const AllPosts = () => {

    let [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const authCtx = useContext(AuthContext);
    const { userId } = authCtx;

    const fetchPosts = async () => {
        const response = await fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json');
        const data = await response.json();
        const initialPosts = [];
        console.log('useEffect called');
        for (const post in data) {
            console.log('Fetching posts ')
            if (data[post].userId === userId) {
                const postObject = {
                    postId: post,
                    postData: data[post]
                }
                initialPosts.push(postObject);
            }
        }
        setPosts(initialPosts.reverse());
        setIsLoading(false);
    }

    useEffect(fetchPosts, []);


    const postDeleteHandler = (postId) => {
        fetch(`https://blog-app-8981b-default-rtdb.firebaseio.com/posts/${postId}.json`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                if (data === null) {

                    fetchPosts();
                }
            })
            .catch(err => {
                alert(err);
            })

    }


    return (
        <Container className={classes.AllPostsContainer}>
            {
                isLoading ? <Spinner /> :
                    posts.map(post => {
                        return (<PostItem key={post.postId} postData={post.postData} postId={post.postId} onDelete={() => postDeleteHandler(post.postId)} />)
                    })
            }
            {
                posts && posts.length === 0 && <p style={{ textAlign: 'center' }}>No posts found. Create one!</p>
            }
        </Container>
    );
}

export default AllPosts;