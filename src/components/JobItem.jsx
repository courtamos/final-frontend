/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// MaterialUI Components
import {
  Box, IconButton, Typography, Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// Custom Components
import ModalConfirm from './ModalConfirm';

import './JobItem.scss';
import { JobsModal } from '../features/dashboard/Jobs-modal';

const useStyles = makeStyles({
  container: {
    marginTop: '10px',
  },

  panel: {
    backgroundColor: 'white',
    marginBottom: '5px',
    padding: '10px',
    '&:hover': {
      backgroundColor: '#f6f6f6',
    },
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
  console.log(props);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const classes = useStyles();
  const {
    id,
    company,
    title,
    description,
    location,
    salary,
    status,
    url,
    contact_name,
    contact_email,
    contact_phone,
    contact_socialmedia,
  } = props;

  const companyLogo = (logo) => {
    const logoImage = logo.replace(/\s/g, '');
    return `//logo.clearbit.com/${logoImage}.com`;
  };

  const openModal = () => {
    if (!editModalOpen) {
      setEditModalOpen(true);
    }
  };

  const closeModal = () => {
    if (editModalOpen) {
      setEditModalOpen(false);
    }
  };

  // const getCompanyLogo = (logo) => {
  //   axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${logo}`).then((res) => res.data[0].logo).catch((err) => err);
  // };

  // console.log(getCompanyLogo('Facebook'));

  // const handleDeleteConfirmModal = () => {
  //   setModalOpen(true);
  // };

  // const handleEditConfirmModal = () => {
  //   // No current functionality
  // };

  const handleConfirmDelete = () => {
    // Handle Delete Logic here
    setModalOpen(false);
  };

  const handleDeclineDelete = () => {
    setModalOpen(false);
  };

  const handleRedirect = () => {
    if (url !== '') {
      return url;
    }
    return null;
  };

  return (
    <Paper elevation={1} className={classes.panel} variant="contained">
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
            <a href={handleRedirect()} target="_blank" rel="noreferrer">
              <img src={companyLogo(company)} alt="logo" width="45px" className={classes.image} />
            </a>
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h6" align="left" className={classes.heading}>{company}</Typography>
            <Typography variant="h8" align="left" className={classes.heading}>{title}</Typography>
            <Typography variant="body2" align="left" className={classes.content}>{location}</Typography>
          </Box>
          <Box>
            <IconButton aria-label="delete" onClick={() => { setModalOpen(true); }}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={openModal}>
              <JobsModal
                open={editModalOpen}
                onClose={closeModal}
                id={id}
                companyName={company}
                jobTitle={title}
                jobDetails={description}
                jobLocation={location}
                jobSalary={salary}
                jobStatus={status}
                jobUrl={url}
                jobContact_name={contact_name}
                jobContact_email={contact_email}
                jobContact_phone={contact_phone}
                jobContact_socialmedia={contact_socialmedia}
              />
              <EditIcon />
            </IconButton>
          </Box>
          <ModalConfirm id="modal-confirm-delete" open={modalOpen} onConfirm={handleConfirmDelete} onDecline={handleDeclineDelete} />
        </Box>
      </Box>
    </Paper>
  );
};

JobItem.propTypes = {
  id: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  contact_name: PropTypes.string.isRequired,
  contact_email: PropTypes.string.isRequired,
  contact_phone: PropTypes.string.isRequired,
  contact_socialmedia: PropTypes.string.isRequired,
};

export default JobItem;
