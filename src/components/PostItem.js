
import React, { useContext } from 'react';
import classes from './PostItem.module.css';
import { Link, Route } from 'react-router-dom';

import { Card, Button } from 'react-bootstrap';
import HighlightedPost from './HighlightedPost';
import AuthContext from './../store/auth-context';

const PostItem = (props) => {

    const authCtx = useContext(AuthContext);
    console.log(authCtx);
    const { title: postTitle, content: postContent } = props.postData.post;
    const postId = props.postId;




    return (
        <Card>
            <Card.Body style={{ textAlign: 'left' }}>
                <Card.Title className={classes.LeftAlignment}>{postTitle}</Card.Title>
                <Card.Text className={classes.LeftAlignment}>
                    {postContent}
                </Card.Text>
                <Link to={'/' + authCtx.userId + '/posts/' + postId}>
                    <Button variant="primary">More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default PostItem;