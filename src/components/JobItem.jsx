/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, IconButton, Typography, Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import ModalConfirm from './ModalConfirm';
import { JobsModal } from '../features/dashboard/JobsModal';
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
    task,
    index,
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
    if (task.url && task.url !== '') {
      if (task.url.substring(0, 4) !== 'http') {
        return `http://${task.url}`;
      }
      return task.url;
    }
    return null;
  };

  useEffect(() => {
    const expirydate = new Date(task.event_date);
    const currentdate = Date.now();

    setEventExpired(false);

    if (expirydate < currentdate) {
      setEventExpired(true);
    }
  }, [task.event_date]);

  useEffect(async () => {
    if (task.company && task.company.length > 0) {
      try {
        const result = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${task.company}`,
        );
        setLogo(result.data[0].logo);
      } catch (err) {
        setLogo('../img/Logo2.png');
      }
    }
  }, [task.company]);

  return (
    <Draggable
      draggableId={task.id.toString()}
      index={index}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
                  <Typography variant="h5" align="left" className={classes.heading}>{task.company}</Typography>
                  <Typography variant="body1" align="left" className={classes.subheading}>{task.title}</Typography>
                  <Typography variant="body2" align="left" className={classes.content}>{task.location}</Typography>
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
                    companyName={task.company}
                    jobTitle={task.title}
                    jobDetails={task.description}
                    jobLocation={task.location}
                    jobSalary={task.salary}
                    jobStatus={task.status}
                    jobUrl={task.url}
                    jobContact_name={task.contact_name}
                    jobContact_email={task.contact_email}
                    jobContact_phone={task.contact_phone}
                    jobContact_socialmedia={task.contact_socialmedia}
                    jobResume_url={task.resume_url}
                    jobCoverletter_url={task.coverletter_url}
                    jobExtra_url={task.extra_url}
                    event_title={task.event_title}
                    event_expired={task.event_expired}
                    event_details={task.event_details}
                    event_date={task.event_date}
                    event_location={task.event_location}
                    event_jobid={task.event_jobid}
                    event_id={task.event_id}
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
  task: PropTypes.instanceOf(Object),
  index: PropTypes.number,
};

JobItem.defaultProps = {
  id: undefined,
  task: {},
  index: 0,
};

export default JobItem;
