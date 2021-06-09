import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios';

// MaterialUI Components
import {
  Box, Button, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// Custom Components
import ModalConfirm from './ModalConfirm';

import './JobItem.scss';

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
  },

  panel: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: '5px',
  },

  logo: {
    width: '75px',
    height: '75px',
  },

  image: {
    borderRadius: '50%',
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

  const companyLogo = (logo) => {
    const logoImage = logo.replace(/\s/g, '');
    return `//logo.clearbit.com/${logoImage}.com`;
  };

  // const getCompanyLogo = (logo) => {
  //   axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${logo}`).then((res) => res.data[0].logo).catch((err) => err);
  // };

  // console.log(getCompanyLogo('Facebook'));

  const [modalOpen, setModalOpen] = useState(false);

  // const handleDeleteConfirmModal = () => {
  //   setModalOpen(true);
  // };

  const handleEditConfirmModal = () => {};

  const handleConfirmDelete = () => {
    // Handle Delete Logic here
    setModalOpen(false);
  };

  const handleDeclineDelete = () => {
    setModalOpen(false);
  };

  return (
    <Button className={classes.panel} variant="contained">
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <MenuIcon />
          <Box display="flex" alignItems="center" justifyContent="center" className={classes.logo}>
            {/* Fetch the icon from an api here */}
            <img src={companyLogo(company)} alt="logo" width="45px" className={classes.image} />
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6" align="left" className={classes.heading}>{company}</Typography>
            <Typography variant="h8" align="left" className={classes.heading}>{title}</Typography>
            <Typography variant="body1" align="left" className={classes.content}>{description}</Typography>
            <Typography variant="body2" align="left" className={classes.content}>{location}</Typography>
          </Box>
          <Box>
            <IconButton aria-label="delete" onClick={() => { setModalOpen(true); }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleEditConfirmModal}>
              <EditIcon />
            </IconButton>
          </Box>
          <ModalConfirm id="modal-confirm-delete" open={modalOpen} onConfirm={handleConfirmDelete} onDecline={handleDeclineDelete} />
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
