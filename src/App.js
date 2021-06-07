import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';

import { Users } from "./features/users/Users";
import { Jobs } from "./features/jobs/Jobs";
import { Events } from "./features/events/Events";
import { PrivateRoute } from "./components/PrivateRoute";
import { authSelector, fetchLoggedInStatus } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(authSelector);

  useEffect(() => {
    dispatch(fetchLoggedInStatus())
  }, [dispatch])

  if (status === 'loading') return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <Router>
      <Users />
      <Jobs />
      <Events />

      <Switch>
        <PrivateRoute path="/dashboard">
          <h1>Dashboard</h1>
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
        <Route path={['/login', '/']}>
          {/* replace h1 with login component */}
          <h1>Login</h1> 
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
