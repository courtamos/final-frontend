import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

import PrivateRoute from './components/PrivateRoute';
import { authSelector, fetchLoggedInStatus } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchLoggedInStatus());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
          <Switch>
            <Route path="/dashboard/profile">
              <h1>Profile</h1>
            </Route>
            <Route path="/dashboard/jobs">
              <h1>Jobs</h1>
            </Route>
          </Switch>
        </PrivateRoute>
        <Route path="/profile">
          <h1>Profile</h1>
        </Route>
        <Route path="/signup">
          <h1>Sign Up</h1>
          <Signup />
        </Route>
        <Route path={['/login', '/']}>
          <h1>Login</h1>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
