import React from 'react';
import PropTypes from 'prop-types';

// MaterialUI Components
import {
  Box, Button, Paper, Typography,
} from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Components

import './JobItem.scss';

const JobItem = (props) => {
  const {
    company, title, description, location,
  } = props;

  return (
    <StylesProvider injectFirst>
      <Button elevation={1} square className="panel" onClic>
        <Box
          p={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          m={2}
        >
          <Box display="flex" alignItems="center" justifyContent="center" className="logo" m={2}>
            {/* Fetch the icon from an api here */}
            <img src="../../img/facebook.png" alt="logo" width="75px" />
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h4" align="left" className="heading">{company}</Typography>
            <Typography variant="h6" align="left" className="heading">{title}</Typography>
            <Typography variant="body1" align="left" className="content">{description}</Typography>
            <Typography variant="body2" align="left" className="content">{location}</Typography>
          </Box>
          <Box id="end" display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
            <MenuIcon />
          </Box>
        </Box>
      </Button>
    </StylesProvider>
  );
};

JobItem.propTypes = {
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default JobItem;
