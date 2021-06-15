/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, IconButton, Typography, Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import ModalConfirm from './ModalConfirm';
import { JobsModal } from '../features/dashboard/Jobs-modal';
import { deleteJob } from '../features/dashboard/jobs/jobsSlice';

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
    minWidth: '75px',
    height: '75px',
    '@media (max-width:1550px)': {
      width: '50px',
      minWidth: '50px',
      height: '50px',
    },
    fontSize: '0px',
    paddingRight: '3px',
  },

  image: {
    width: '50px',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    '@media (max-width:1550px)': {
      width: '35px',
      minWidth: '35px',
      height: '35px',
    },
  },

  heading: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600',
    paddingTop: '0px',
    paddingBottom: '3px',
    lineHeight: '1em',
  },

  subheading: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '500',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '1em',
  },

  content: {
    fontFamily: 'Source Sans Pro, sans-serif',
    paddingTop: '3px',
    paddingBottom: '0px',
    lineHeight: '1em',
  },

  buttonbox: {
    flexDirection: 'row',
    '@media (max-width:1550px)': {
      flexDirection: 'column',
    },
  },
  iconbutton: {
    width: '1.5em',
    height: '1.5em',
    color: '#d9d9d9',
  },
});

const JobItem = (props) => {
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventExpired, setEventExpired] = useState(false);
  const [logo, setLogo] = useState('');
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
    event_title,
    event_expired,
    event_details,
    event_date,
    event_location,
    event_jobid,
    event_id,
    resume_url,
    coverletter_url,
    extra_url,
  } = props;

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteJob({ jobId: id }));
    setModalOpen(false);
  };

  const handleDeclineDelete = () => {
    setModalOpen(false);
  };

  const handleRedirect = () => {
    if (url !== '') {
      if (url.substring(0, 4) !== 'http') {
        return `http://${url}`;
      }
      return url;
    }
    return null;
  };

  useEffect(() => {
    const expirydate = new Date(event_date);
    const currentdate = Date.now();

    setEventExpired(false);

    if (expirydate < currentdate) {
      setEventExpired(true);
    }
  }, [event_date]);

  useEffect(async () => {
    if (company.length > 0) {
      try {
        const result = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`,
        );
        setLogo(result.data[0].logo);
      } catch (err) {
        setLogo('https://i.imgur.com/n7X5rsl.png');
      }
    }
  }, [company]);

  return (
    <Paper elevation={1} className={classes.panel}>
      {eventExpired ? (
        <Box position="absolute" style={{ marginTop: '-7px', marginLeft: '-7px' }}>
          <NewReleasesIcon style={{ color: '#f94144', fontSize: '1.5em' }} />
        </Box>
      ) : null}
      <Box display="flex" flexDirection="column" width="100%">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
        >
          <Box display="flex" alignItems="center" justifyContent="center" className={classes.logo}>
            <a href={handleRedirect()} target="_blank" rel="noreferrer">
              <img src={logo} alt="logo" width="45px" className={classes.image} />
            </a>
          </Box>
          <Box display="flex" flexDirection="column" flexGrow={1}>
            <Typography variant="h5" align="left" className={classes.heading}>{company}</Typography>
            <Typography variant="body1" align="left" className={classes.subheading}>{title}</Typography>
            <Typography variant="body2" align="left" className={classes.content}>{location}</Typography>
          </Box>
          <Box className={classes.buttonbox} display="flex">
            <IconButton
              id="icon-button"
              aria-label="edit-item"
              onClick={openModal}
              className={classes.iconbutton}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => { setModalOpen(true); }}
              className={classes.iconbutton}

            >
              <DeleteIcon />
            </IconButton>
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
              jobResume_url={resume_url}
              jobCoverletter_url={coverletter_url}
              jobExtra_url={extra_url}
              event_title={event_title}
              event_expired={event_expired}
              event_details={event_details}
              event_date={event_date}
              event_location={event_location}
              event_jobid={event_jobid}
              event_id={event_id}
              isEditModal
            />
          </Box>

          <ModalConfirm id="modal-confirm-delete" open={modalOpen} onConfirm={handleConfirmDelete} onDecline={handleDeclineDelete} />
        </Box>
      </Box>
    </Paper>
  );
};

JobItem.propTypes = {
  id: PropTypes.number,
  company: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  salary: PropTypes.number,
  status: PropTypes.number,
  url: PropTypes.string,
  contact_name: PropTypes.string,
  contact_email: PropTypes.string,
  contact_phone: PropTypes.string,
  contact_socialmedia: PropTypes.string,
  resume_url: PropTypes.string,
  coverletter_url: PropTypes.string,
  extra_url: PropTypes.string,
  event_title: PropTypes.string,
  event_expired: PropTypes.bool,
  event_details: PropTypes.string,
  event_date: PropTypes.string,
  event_location: PropTypes.string,
  event_jobid: PropTypes.number,
  event_id: PropTypes.number,
};

JobItem.defaultProps = {
  id: undefined,
  company: '',
  title: '',
  description: '',
  location: '',
  salary: undefined,
  status: undefined,
  url: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  contact_socialmedia: '',
  resume_url: '',
  coverletter_url: '',
  extra_url: '',
  event_title: '',
  event_expired: false,
  event_details: '',
  event_date: '',
  event_location: '',
  event_jobid: undefined,
  event_id: undefined,
};

export default JobItem;
