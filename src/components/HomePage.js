import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import { Link, Route, Redirect } from 'react-router-dom';

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
                    <Link to="/signup"><Button variant="primary" size="lg" >Start Now</Button></Link>
                </div>
            </main>
        </section>
    );
}

export default HomePage;