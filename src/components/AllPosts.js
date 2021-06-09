import { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';

import PostItem from './PostItem';
import classes from './AllPosts.module.css';

import AuthContext from '../store/auth-context';

const AllPosts = () => {

    let [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const authCtx = useContext(AuthContext);
    const { userId } = authCtx;


    useEffect(

        async () => {
            const response = await fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json');
            const data = await response.json();
            const initialPosts = [];
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
            setPosts(initialPosts);
            setIsLoading(false);
        }, []);


    return (
        <Container>
            {
                isLoading ? <p>Loading...</p> :
                    posts.map(post => {
                        return (<PostItem key={post.postId} postData={post.postData} postId={post.postId} />)
                    })
            }
            {
                posts && posts.length === 0 && <p>No posts found. Create one!</p>
            }
        </Container>
    );
}

export default AllPosts;