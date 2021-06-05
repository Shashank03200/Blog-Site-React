import classes from "./NewPost.module.css";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import { useContext, useState, useRef } from 'react';

import AuthContext from '../store/auth-context.js'

const NewPost = (props) => {

    const titleInputRef = useRef();
    const contentInputRef = useRef();


    const authCtx = useContext(AuthContext);
    const history = useHistory();

    console.log(authCtx);

    const newPostCancelHandler = () => {
        authCtx.setNewBtnState(true);
        history.replace(`/${authCtx.userId}/posts`)
    }

    const formSubmitHandler = (event) => {

        event.preventDefault();

        fetch('https://blog-app-8981b-default-rtdb.firebaseio.com/posts.json', {
            method: 'POST',
            body: JSON.stringify({
                userId: authCtx.userId,
                post: {
                    title: titleInputRef.current.value,
                    content: contentInputRef.current.value
                }
            }),
            'contentType': 'application/json'

        }).then(response => {
            history.replace("/" + authCtx.userId + "/posts");
            authCtx.setNewBtnState(true);
            return response;
        })
            .then(data => {

            })

    }

    return (
        <Container className={classes.Container}>
            <div className={classes.ContainerTitle}>
                <h2>Create a new blog</h2>
                <Button variant="danger" onClick={newPostCancelHandler}>Cancel</Button>
            </div>
            <Form onSubmit={formSubmitHandler}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control size="lg" type="text" ref={titleInputRef} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows={10} size="lg" ref={contentInputRef} />
                </Form.Group>
                <div className={classes.postBtnDiv}>
                    <Button variant="primary" size="lg" onClick={formSubmitHandler} >Post</Button>
                </div>
            </Form>
        </Container>

    );
}

export default NewPost;