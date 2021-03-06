import { Form, Button, Container } from "react-bootstrap";
import { useRef, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './AuthenticationPage.module.css';

import firebase from 'firebase';



const AuthenticationPage = (props) => {

    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState('');

    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    let method;
    if (props.method === 'signup') {
        method = 'Sign up'
    } else if (props.method === 'login') {
        method = 'Log In'
    }



    const googleSignInHandler = () => {

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var idToken = result.credential.accessToken;
                var userId = result.user.uid;
                var user = result.user;
                const newUser = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    email: user.email
                }
                authCtx.loginHandler(user.uid, idToken, newUser)
                history.push(`/${user.uid}/posts`)

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    const authFormSubmitHandler = (event) => {

        event.preventDefault();

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        setIsLoading(true);
        let authURL = '';
        if (method === 'Sign up') {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSplRafoXJxfUlQxItCDlr2cr3pRfcu0U'
        } else {
            authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSplRafoXJxfUlQxItCDlr2cr3pRfcu0U'
        }

        const submitCredentials = async () => {
            const response = await fetch(authURL,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            const data = await response.json();
            return data;
        }

        submitCredentials().then((data) => {
            
            let errorMessage = 'Authetication failed!';
            if (data && data.error && data.error.message) {
                errorMessage = data.error.message
                alert(errorMessage)
            } else {

                const newUser = {
                    displayName: '',
                    photoURL: '',
                    email: data.email
                }

                authCtx.loginHandler(data.localId, data.idToken, newUser);
                history.push(`/${data.localId}/posts`)
            }
        }).catch((error) => {
            console.log(error);


        })

        setIsLoading(false)
        // resetting inputs
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';

    }

    let ctaComponent = (
        <Button variant="primary" type="submit" className={classes.SubmitButton}>
            {method}
        </Button>
    );
    if (isLoading) {
        ctaComponent = <p>Sending request.</p>
    }

    return (
        <Container className={classes.AuthContainer}>
            <h2 className={classes.authMethod}>{method}</h2>
            <Form onSubmit={authFormSubmitHandler}>
                {/* {
                    method === 'Sign up' &&
                    <Form.Row className={classes.FormGroup}>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control placeholder="First name" ref={fnameInputRef} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control placeholder="Last name" ref={lnameInputRef} />
                        </Col>
                    </Form.Row>
                } */}
                <Form.Group controlId="formBasicEmail" className={classes.FormGroup}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className={classes.FormGroup}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
                </Form.Group>
                <div className={classes.SubmitButtonDiv}>
                    {ctaComponent}
                </div>


            </Form>
            {method === 'Sign up' && <p>Already a blogger ? <br /><Link to="/login">Login</Link></p>}
            {method === "Log In" && <p>New user ?  <br /><Link to="/signup">Sign up</Link></p>}

            <div className={classes.SubmitButtonDiv}>
                <button className={classes.GoogleSignInButton} onClick={googleSignInHandler}>
                    <span className={classes.GoogleIconContainer}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" />
                    </span>
                    <span className={classes.GoogleSignInText} >
                        Sign in with Google
                </span>
                </button>
            </div>

        </Container>


    );
}

export default AuthenticationPage;