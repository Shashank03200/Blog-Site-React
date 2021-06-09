
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Fragment, useContext, Suspense } from 'react';
import AuthContext from './store/auth-context';

const HomePage = React.lazy(() => import('./components/HomePage'));
const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AuthenticationPage = React.lazy(() => import('./components/AuthenticationPage'));
const NewPost = React.lazy(() => import('./components/NewPost'));
const AllPosts = React.lazy(() => import('./components/AllPosts'));
const HighlightedPost = React.lazy(() => import('./components/HighlightedPost'));
const ResetPassword = React.lazy(() => import('./components/ResetPassword'));

function App() {

  const authCtx = useContext(AuthContext);

  const { isLoggedIn } = authCtx;

  return (
    <Suspense fallback="Loading.">
      <Layout />
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Redirect to={`/${authCtx.userId}/posts`} />}
          {!isLoggedIn && <HomePage />}
        </Route>


        <Route path="/login">
          {!isLoggedIn && <AuthenticationPage method="login" />}
          {isLoggedIn && <Redirect to={"/" + authCtx.userId + "/posts"} />}
        </Route>


        <Route path="/signup">
          {!isLoggedIn && <AuthenticationPage method="signup" />}
          {isLoggedIn && <Redirect to={"/" + authCtx.userId + "/posts"} />}
        </Route>


        <Route path="/:userId/new-post">
          {isLoggedIn && <NewPost />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/:userId/resetPassword">
          {isLoggedIn && <ResetPassword />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>


        <Route path="/:userId/posts" exact>
          {isLoggedIn && <AllPosts />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>


        {isLoggedIn &&
          <Route path={'/:userId/posts/:postId'}>
            <HighlightedPost />
          </Route>
        }
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Suspense>

  );
}

export default App;
