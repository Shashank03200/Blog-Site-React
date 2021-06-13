import classes from "./NewPost.module.css";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory, useParams } from 'react-router-dom'
import { useContext, useRef, useEffect } from 'react';

import AuthContext from '../store/auth-context.js'

const NewPost = (props) => {

    const titleInputRef = useRef();
    const contentInputRef = useRef();
    const postImageRef = useRef();
    const params = useParams();

    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const newPostCancelHandler = () => {
        authCtx.setNewBtnState(true);
        history.replace(`/${authCtx.userId}/posts`)
    }

    const { isEditing } = props;

    useEffect(() => {
        authCtx.setNewBtnState(false)
        if (props.isEditing) {
            async function fetchEditablePost() {
                const postURL = `https://blog-app-8981b-default-rtdb.firebaseio.com/posts/${params.postId}.json`;
                fetch(postURL).then(response => response.json())
                    .then(data => {
                        console.log(data);
                        titleInputRef.current.value = data.post.title;
                        contentInputRef.current.value = data.post.content;
                        postImageRef.current.value = data.post.postImage;
                    })
            }
            fetchEditablePost();
        }
    }, [isEditing])



    const formSubmitHandler = (event) => {

        event.preventDefault();

        let postURL = 'https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json';
        let method = 'POST'
        if (props.isEditing) {
            postURL = `https://blog-app-8981b-default-rtdb.firebaseio.com/posts/${params.postId}.json`;
            method = 'PATCH'
        }

        fetch(postURL, {
            method: method,
            body: JSON.stringify({
                userId: authCtx.userId,
                post: {
                    title: titleInputRef.current.value,
                    content: contentInputRef.current.value,
                    postImage: postImageRef.current.value
                }
            }),
            'contentType': 'application/json'

        }).then(response => {
            history.replace("/" + authCtx.userId + "/posts");
            authCtx.setNewBtnState(true);
            return response;
        })


    }

    return (
        <Container className={classes.Container}>
            <div className={classes.ContainerTitle}>
                <h2 className={classes.NewPostFormHeading}>Create a new blog</h2>
                <Button variant="danger" onClick={newPostCancelHandler}>Cancel</Button>
            </div>
            <Form onSubmit={formSubmitHandler}>

                <Form.Group>
                    <Form.Label className={classes.FormInputLabel}>Text</Form.Label>
                    <Form.Control as="textarea" className={classes.PostTitleInputBox} rows={2} size="sm" ref={titleInputRef} resizable={false} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={classes.FormInputLabel}>Post Image URL</Form.Label>
                    <Form.Control className={classes.PostImageInputBox} type="text" ref={postImageRef} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={classes.FormInputLabel}>Text</Form.Label>
                    <Form.Control as="textarea" className={classes.PostTextInputBox} rows={10} size="sm" ref={contentInputRef} resizable={false} />
                </Form.Group>
                <div className={classes.postBtnDiv}>
                    <Button variant="primary" size="lg" onClick={formSubmitHandler} >
                        {isEditing ? 'Update' : 'Post'}
                    </Button>
                </div>
            </Form>
        </Container>

    );
}

export default NewPost;