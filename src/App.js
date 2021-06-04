
import './App.css';
import HomePage from './components/HomePage';
import Layout from './components/Layout/Layout';
import AuthenticationPage from './components/AuthenticationPage';
import NewPost from './components/NewPost'

import { Switch, Route, Redirect } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AuthContext from './store/auth-context';
import AllPosts from './components/AllPosts';
import HighlightedPost from './components/HighlightedPost'

function App() {

  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <Fragment>
      <Layout />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Redirect to={`/${authCtx.userId}/posts`} />}
          {!isLoggedIn && <HomePage />}
        </Route>

        {!isLoggedIn &&
          <Route path="/login">
            {!isLoggedIn && <AuthenticationPage method="login" />}
            {isLoggedIn && <Redirect to={"/" + authCtx.userId + "/posts"} />}
          </Route>
        }

        <Route path="/signup">
          {!isLoggedIn && <AuthenticationPage method="signup" />}
          {isLoggedIn && <Redirect to={"/" + authCtx.userId + "/posts"} />}
        </Route>


        <Route path="/:userId/new-post">
          {isLoggedIn && <NewPost />}
          {!isLoggedIn && <Redirect to="/signup" />}
        </Route>

        {isLoggedIn &&
          <Route path="/:userId/posts" exact>
            {isLoggedIn && <AllPosts />}
            {!isLoggedIn && <Redirect to="/signup" />}
          </Route>
        }

        {isLoggedIn &&
          <Route path={'/:userId/posts/:postId'}>
            <HighlightedPost />
          </Route>
        }
        <Route path="*">
          <Redirect to="/signup" />
        </Route>
      </Switch>
    </Fragment>

  );
}

export default App;
