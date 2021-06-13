import { useEffect, useState } from "react";

import classes from './HighlightedPost.module.css';
import { useParams } from 'react-router-dom';

const HighlightedPost = () => {

    const [post, setPost] = useState({});

    const params = useParams();

    useEffect(() => {
        fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts/' + params.postId + '.json')
            .then(response => response.json())
            .then(data => {

                const postObject = {}
                postObject['title'] = data.post.title;
                postObject['content'] = data.post.content;
                postObject['postImage'] = data.post.postImage;
                console.log(postObject);
                setPost(postObject)
            })
    }, []);


    return (
        <div className={classes.Container}>

            <div className={classes.PostTitle}>{post.title}</div>

            <div className={classes.PostContent}>
                <div className={classes.PostImage}>
                    <img src={post.postImage} alt="postImage" />
                </div>
                {post.content}
            </div>
        </div>
    );
}

export default HighlightedPost;