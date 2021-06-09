
import classes from './ResetPassword.module.css';
import { Form, Button, Container } from "react-bootstrap";
import { useRef, useContext, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';


import AuthContext from './../store/auth-context';

const ResetPassword = (props) => {

    const authCtx = useContext(AuthContext);

    const firstPasswordInputRef = useRef();
    const secondPasswordInputRef = useRef();

    const resetFormSubmitHandler = event => {
        event.preventDefault();
        const firstPassword = firstPasswordInputRef.current.value;
        const secondPassword = secondPasswordInputRef.current.value;
        if (firstPassword != secondPassword) {
            alert('Passwords do not match.')
            return;
        }
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSplRafoXJxfUlQxItCDlr2cr3pRfcu0U', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: firstPassword,
                returnSecureToken: true
            }),
            'Content-Type': 'application/json'

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Password changed!\nLogin Again to verify.');
                authCtx.logoutHandler();
                <Redirect to="/login" />
            })
        firstPasswordInputRef.current.value = ''
        secondPasswordInputRef.current.value = ''

    }

    return (
        <Container className={classes.ResetContainer}>
            <h2 className={classes.Title}>Reset Password</h2>
            <Form onSubmit={resetFormSubmitHandler}>

                <Form.Group controlId="password1" className={classes.FormGroup}>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" ref={firstPasswordInputRef} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className={classes.FormGroup}>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm the password" ref={secondPasswordInputRef} />
                </Form.Group>
                <div className={classes.SubmitButtonDiv}>
                    <Button type="submit">Submit</Button>
                </div>


            </Form>

        </Container>
    )
}
export default ResetPassword;