
import React, { useContext } from 'react';
import classes from './PostItem.module.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import AuthContext from './../store/auth-context';

const PostItem = (props) => {

    const authCtx = useContext(AuthContext);


    let { title: postTitle, postImage: postImageURL, content: postContent } = props.postData.post;
    const postId = props.postId;

    if (postTitle.length > 60) {
        postTitle = postTitle.slice(0, 60) + "..."
    }
    if (postContent.length > 200) {
        postContent = postContent.slice(0, 200) + "..."
    }



    return (
        <div className={classes.Card} style={{
            background: `url("${postImageURL}")`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',

        }}>

            <div className={classes.innerLayer}>
                <div>
                    <div className={classes.CardTitle}>{postTitle}</div>
                    <div className={classes.CardText}>
                        {postContent}
                    </div>
                    <div className={classes.PostActionButtonDiv}>
                        <Link to={'/' + authCtx.userId + '/posts/' + postId}>
                            <Button variant="primary" className={classes.ViewPostButton}>View Post</Button>
                        </Link>
                        <Link to={{
                            pathname: '/' + authCtx.userId + '/posts/' + postId,
                            search: "?edit=true",
                            state: { isEditing: true }
                        }}>
                            <Button variant="primary" className={classes.EditPostButton}>Edit Post</Button>
                        </Link>
                        <Button variant="primary" className={classes.DeletePostButton} onClick={props.onDelete}>Delete Post</Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostItem;