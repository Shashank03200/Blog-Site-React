import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { Route, Redirect } from 'react-router';

import AuthContext from '../store/auth-context';
import classes from './HomePage.module.css';

const HomePage = (props) => {

    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const storedIdToken = localStorage.getItem('idToken');
        if (storedIdToken) {

            <Route path="/" >
                <Redirect to={'/' + authCtx.userId + "/posts"} />
            </Route>
        }
    }, [])

    return (
        <section>
            <main>
                <div className={classes['homepage-heading']}>
                    Start Now
            </div>
                <div className={classes['homepage-subheading']}>
                    Writing is the best way to express your thoughts<br />
                Start your free blog now

            </div>
                <div className={classes.ctaButton}>
                    <Button variant="primary" size="lg" >Start Now</Button>
                </div>
            </main>
        </section>
    );
}

export default HomePage;