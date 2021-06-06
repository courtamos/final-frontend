import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Users } from "./features/users/Users";
import { Jobs } from "./features/jobs/Jobs";
import { Events } from "./features/events/Events";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Users />
      <Jobs />
      <Events />

      <Switch>
        <Route path={['/login', '/']}>
          <h1>Login</h1>
        </Route>
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
      </Switch>

    </Router>
  );
}

export default App;
