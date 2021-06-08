import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// MaterialUI Components
import {
  Box, Button, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Components

import './JobItem.scss';

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
  },

  panel: {
    backgroundColor: 'white',
  },

  logo: {
    width: '75px',
    height: '75px',
  },

  heading: {
    fontFamily: 'Montserrat',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '1em',
    margin: '0px',
  },

  content: {
    fontFamily: 'Source Sans Pro',
    paddingTop: '5px',
    paddingBottom: '0px',
    lineHeight: '1em',
    margin: '0px',
  },
});

const JobItem = (props) => {
  const classes = useStyles();
  const {
    company, title, description, location,
  } = props;

  return (
    <Button elevation={1} square className={classes.panel} onClic>
      <Box
        p={1}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" justifyContent="center" className={classes.logo}>
          {/* Fetch the icon from an api here */}
          <img src="../../img/facebook.png" alt="logo" width="45px" />
        </Box>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <Typography variant="h6" align="left" className={classes.heading}>{company}</Typography>
          <Typography variant="h8" align="left" className={classes.heading}>{title}</Typography>
          <Typography variant="body1" align="left" className={classes.content}>{description}</Typography>
          <Typography variant="body2" align="left" className={classes.content}>{location}</Typography>
        </Box>
        <Box id="end" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
          <MenuIcon />
        </Box>
      </Box>
    </Button>
  );
};

JobItem.propTypes = {
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default JobItem;
