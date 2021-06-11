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
        </PrivateRoute>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path={['/login', '/']}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
