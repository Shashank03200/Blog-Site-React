import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';

import UserIcon from './UserIcon';
import Dropdown from 'react-bootstrap/Dropdown'

import classes from './NavigationBar.module.css';
import AuthContext from '../../store/auth-context'
import { Fragment } from 'react';
import ProfileImageIcon from '../ProfileImageIcon';

const NavigationBar = (props) => {

    const authCtx = useContext(AuthContext);
    const { currentUser: user } = authCtx;
    const history = useHistory();
    const location = useLocation();

    const { isLoggedIn } = authCtx;

    const newButtonHandler = () => {

        history.replace('/' + authCtx.userId + '/new-post');
    }



    return (
        <header>
            <div className={classes['navbar-left']}>
                <Link to="/">

                    <div className={classes['navbar-brand']}>
                        Blogger
                    </div>
                </Link>
            </div>

            <div className={classes['navbar-center']}
                style={{
                    backgroundColor: authCtx.isLoggedIn && '#362e68'
                }}
            >
                {
                    isLoggedIn &&
                    <Fragment>

                        <NavLink to={'/' + authCtx.userId + "/posts"} >

                            <Button variant="info" className={classes.NewPostButton} size="sm" onClick={newButtonHandler}>My Posts</Button>
                        </NavLink>
                        {authCtx.isButtonVisible &&
                            <NavLink to={'/' + authCtx.userId + "/new-post"} >
                                <Button variant="info   " className={classes.AllPostsButton} size="sm" >New Post</Button>
                            </NavLink>
                        }

                    </Fragment>
                }
            </div>
            <div className={classes['navbar-right']}>


                {!isLoggedIn && <Link to="/login"><Button variant="success">Login</Button>{' '}</Link>}
                {!isLoggedIn && <Link to="/signup"><Button variant="success">Sign Up</Button>{' '}</Link>}

                {isLoggedIn &&



                    <Dropdown>

                        <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">

                            {authCtx.currentUser.displayName ? <ProfileImageIcon /> : <UserIcon />}
                            <span className={classes.userEmail}>
                                {user.displayName ? user.displayName : user.email}
                            </span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item className="UserButtonActionItem" onClick={authCtx.logoutHandler}>Logout</Dropdown.Item>
                            <Dropdown.Item className="UserButtonActionItem"> <Link to={"/" + authCtx.userId + "/resetPassword"} className={classes.passwordChangeBtnLink}>Change Password</Link></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                }

            </div>

        </header >
    )
}
export default NavigationBar;