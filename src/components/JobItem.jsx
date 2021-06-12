/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, IconButton, Typography, Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ModalConfirm from './ModalConfirm';

import './JobItem.scss';
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
  const dispatch = useDispatch();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [logo, setLogo] = useState('https://i.imgur.com/n7X5rsl.png');
  const classes = useStyles();
  const {
    id,
    index,
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

  useEffect(async () => {
    if (company.length > 0) {
      try {
        const result = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`,
        );
        setLogo(result.data[0].logo);
      } catch (err) {
        return 'https://i.imgur.com/n7X5rsl.png';
      }
    }
    return 'https://i.imgur.com/n7X5rsl.png';
  }, [company]);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div ref={provided.innerRef}>
          <Paper
            elevation={1}
            className={classes.panel}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box display="flex" flexDirection="column" width="100%">
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                width="100%"
              >
                <MenuIcon />

                <Box display="flex" alignItems="center" justifyContent="center" className={classes.logo}>
                  <a href={handleRedirect()} target="_blank" rel="noreferrer">
                    <img src={logo} alt="logo" width="45px" className={classes.image} />
                  </a>
                </Box>
                <Box display="flex" flexDirection="column" flexGrow={1}>
                  <Typography variant="h6" align="left" className={classes.heading}>{company}</Typography>
                  <Typography variant="body1" align="left" className={classes.heading}>{title}</Typography>
                  <Typography variant="body2" align="left" className={classes.content}>{location}</Typography>
                </Box>
                <Box>
                  <IconButton aria-label="delete" onClick={() => { setModalOpen(true); }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    id="icon-button"
                    aria-label="edit-item"
                    onClick={openModal}
                  >
                    <EditIcon />
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
        </div>
      )}

    </Draggable>
  );
};

JobItem.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number.isRequired,
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
  event_details: '',
  event_date: '',
  event_location: '',
  event_jobid: undefined,
  event_id: undefined,
};

export default JobItem;
