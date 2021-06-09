import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';

import UserIcon from './UserIcon';
import Dropdown from 'react-bootstrap/Dropdown'

import classes from './NavigationBar.module.css';
import AuthContext from '../../store/auth-context'
import { Fragment } from 'react';

const NavigationBar = (props) => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const { isLoggedIn } = authCtx;

    const newButtonHandler = () => {
        authCtx.setNewBtnState(false)
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
            <div className={classes['navbar-right']}>


                {!isLoggedIn && <Link to="/login"><Button variant="success">Login</Button>{' '}</Link>}
                {!isLoggedIn && <Link to="/signup"><Button variant="success">SignUp</Button>{' '}</Link>}

                {isLoggedIn &&
                    <Fragment>

                        {authCtx.isButtonVisible &&
                            <Button variant="success" className={classes.NewPostButton} size="lg" onClick={newButtonHandler}>Create New Post</Button>}
                        <Dropdown>

                            <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                                <UserIcon /><span className={classes.userEmail}>{authCtx.email}</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className="UserButtonActionItem" onClick={() => authCtx.logoutHandler()}>Logout</Dropdown.Item>
                                <Dropdown.Item className="UserButtonActionItem"> <Link to={"/" + authCtx.userId + "/resetPassword"} className={classes.passwordChangeBtnLink}>Change Password</Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Fragment>
                }

            </div>

        </header >
    )
}
export default NavigationBar;