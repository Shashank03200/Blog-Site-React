import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import classes from './HighlightedPost.module.css';
import { useParams } from 'react-router-dom';

const HighlightedPost = () => {

    const [post, setPost] = useState({});

    const params = useParams();
    console.log(params);
    useEffect(() => {
        fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts/' + params.postId + '.json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const postObject = {}
                postObject['title'] = data.post.title;
                postObject['content'] = data.post.content;
                console.log(postObject);
                setPost(postObject)
            })
    }, [])

    return (
        <Container >
            <div className={classes.PostTitle}><h2>{post.title}</h2></div>
            <div className={classes.PostContent}><h4>{post.content}</h4></div>
        </Container>
    );
}

export default HighlightedPost;