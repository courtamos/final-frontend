import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';

import PrivateRoute from './components/PrivateRoute';
import { authSelector, fetchLoggedInStatus } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(authSelector);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#577590',
      },
      secondary: {
        main: '#43aa8b',
      },
      error: {
        main: '#F94144',
      },
      warning: {
        main: '#F3722C',
      },
      info: {
        main: '##43aa8b',
      },
      success: {
        main: '#90be6d',
      },
    },
  });

  theme.typography.h4 = {
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.8rem',
    },
  };

  theme.typography.h5 = {
    fontSize: '1.2rem',
    marginBottom: '0.1em',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.4rem',
    },
  };

  theme.typography.body1 = {
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    '@media (min-width:600px)': {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '1.0rem',
    },
  };

  theme.typography.body2 = {
    fontSize: '1.2rem',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '400',
    '@media (min-width:600px)': {
      fontSize: '0.7rem',
    },
    [theme.breakpoints.up('xl')]: {
      fontSize: '0.9rem',
    },
  };

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
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
