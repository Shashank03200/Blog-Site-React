
import './App.css';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import React, { Fragment, useContext, Suspense, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';
import firebase from 'firebase';

import Spinner from './components/Spinner';
const HomePage = React.lazy(() => import('./components/HomePage'));
const Layout = React.lazy(() => import('./components/Layout/Layout'));
const AuthenticationPage = React.lazy(() => import('./components/AuthenticationPage'));
const NewPost = React.lazy(() => import('./components/NewPost'));
const AllPosts = React.lazy(() => import('./components/AllPosts'));
const HighlightedPost = React.lazy(() => import('./components/HighlightedPost'));
const ResetPassword = React.lazy(() => import('./components/ResetPassword'));

function App() {

  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const { isLoggedIn } = authCtx;
  const [isEditing, setIsEditing] = useState(false);
  const { search } = location;

  React.useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDSplRafoXJxfUlQxItCDlr2cr3pRfcu0U",
      authDomain: "blog-app-8981b.firebaseapp.com",
      databaseURL: "https://blog-app-8981b-default-rtdb.firebaseio.com",
      projectId: "blog-app-8981b",
      storageBucket: "blog-app-8981b.appspot.com",
      messagingSenderId: "995239038719",
      appId: "1:995239038719:web:79dc760a1789059788c6ca"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    console.log("useEffect ")
    const queryParams = new URLSearchParams(location.search);
    setIsEditing(queryParams.get("edit"))
    console.log(isEditing);
  }, [search])

  return (
    <Suspense fallback={<Spinner />} >
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
            {!isEditing && <HighlightedPost />}
            {isEditing && <NewPost isEditing={true} />}
          </Route>
        }

        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Suspense >

  );
}

export default App;
