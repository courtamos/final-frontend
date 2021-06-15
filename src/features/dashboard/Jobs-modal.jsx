/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  withStyles, StylesProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { google } from 'calendar-link';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitationSharp';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import OpenInNewSharpIcon from '@material-ui/icons/OpenInNewSharp';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import MailOutlineSharpIcon from '@material-ui/icons/MailOutlineSharp';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import PhoneIcon from '@material-ui/icons/Phone';
import Grow from '@material-ui/core/Grow';
import CancelIcon from '@material-ui/icons/Cancel';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ModalConfirm from '../../components/ModalConfirm';

import '../../styles/Jobs-modal.scss';
import { authSelector } from '../auth/authSlice';
import { addJob, editJob, deleteJob } from './jobs/jobsSlice';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogActions);

export const JobsModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const {
    onClose,
    open,
    id,
    companyName,
    jobTitle,
    jobDetails,
    jobLocation,
    jobSalary,
    jobStatus,
    jobUrl,
    jobContact_name,
    jobContact_email,
    jobContact_phone,
    jobContact_socialmedia,
    isEditModal,
    event_title,
    event_expired,
    event_details,
    event_date,
    event_location,
    jobResume_url,
    jobCoverletter_url,
    jobExtra_url,
  } = props;

  // const user_id = id;
  const [company, setCompany] = useState(companyName || '');
  const [title, setTitle] = useState(jobTitle || '');
  const [status, setStatus] = useState(jobStatus || 0);
  const [salary, setSalary] = useState(jobSalary || 0);
  const [url, setUrl] = useState(jobUrl || '');
  const [location, setLocation] = useState(jobLocation || '');
  const [details, setDetails] = useState(jobDetails || '');
  const [contact_name, setContact_name] = useState(jobContact_name || '');
  const [contact_email, setContact_email] = useState(jobContact_email || '');
  const [contact_phone, setContact_phone] = useState(jobContact_phone || '');
  const [contact_socialmedia, setContact_socialmedia] = useState(jobContact_socialmedia || '');
  const [events, setEvents] = useState(event_title || '');
  const [selectedDate, setSelectedDate] = useState(event_date || null);
  const [eventDetails, setEventDetails] = useState(event_details || '');
  const [eventExpired, setEventExpired] = useState(event_expired || false);
  const [eventLocation, setEventLocation] = useState(event_location || '');
  const [resume_url, setResume_url] = useState(jobResume_url || '');
  const [coverletter_url, setCoverletter_url] = useState(jobCoverletter_url || '');
  const [extra_url, setExtra_url] = useState(jobExtra_url || '');
  const [error, setError] = useState('');
  const [logo, setLogo] = useState('../../img/Logo2.png');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  function reset() {
    setCompany('');
    setTitle('');
    setSalary(0);
    setStatus(0);
    setUrl('');
    setLocation('');
    setDetails('');
    setContact_name('');
    setContact_email('');
    setContact_phone('');
    setContact_socialmedia('');
    setEvents('');
    setEventExpired(false);
    setEventDetails('');
    setEventLocation('');
    setSelectedDate(null);
    setResume_url('');
    setCoverletter_url('');
    setExtra_url('');
    setLogo('../../img/Logo2.png');
    setError('');
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
    if (company === '' || title === '') {
      setError('Must include both Company Name and Job Title');
      return;
    }

    if (salary === undefined) {
      setError('Salary Must be a Number');
      return;
    }

    const job = {
      user_id: user.id,
      company,
      title,
      status,
      salary,
      url,
      location,
      details,
      contact_name,
      contact_email,
      contact_phone,
      contact_socialmedia,
      resume_url,
      coverletter_url,
      extra_url,
    };

    const event = {
      job_id: id,
      title: events,
      expired: eventExpired,
      date: selectedDate,
      details: eventDetails,
      location: eventLocation,
    };

    if (((!event.title && event.date) || (event.title && !event.date))
      || ((!event.title && !event.date) && (event.details || event.location))) {
      setError('Must include both Event Title and Event Date');
      return;
    }

    let actionResult;
    let selectedAction;

    if (id) {
      selectedAction = editJob;
      if (!event.title && !event.date && !event.details && !event.location) {
        actionResult = await dispatch(selectedAction({ jobId: id, job }));
      } else {
        actionResult = await dispatch(selectedAction({
          jobId: id, job, event,
        }));
      }
    } else if (!event.title && !event.date && !event.details && !event.location) {
      selectedAction = addJob;
      actionResult = await dispatch(selectedAction({ job }));
    } else {
      selectedAction = addJob;
      actionResult = await dispatch(selectedAction({ job, event }));
    }

    if (selectedAction.rejected.match(actionResult)) {
      setError('Action failed, please try again');
    } else if (selectedAction.fulfilled.match(actionResult)) {
      onClose();
      if (!isEditModal) {
        reset();
      }
    }
  };

  const handleDelete = async () => {
    const actionResult = await dispatch(deleteJob({ jobId: id }));

    if (deleteJob.rejected.match(actionResult)) {
      setError('Delete failed, please try again');
      return;
    }

    onClose();
  };

  useEffect(() => {
    const expirydate = new Date(selectedDate);
    const currentdate = Date.now();

    setEventExpired(false);

    if (expirydate < currentdate) {
      setEventExpired(true);
    }
  }, [selectedDate]);

  useEffect(async () => {
    if (company.length > 0) {
      try {
        const result = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${company}`,
        );
        setLogo(result.data[0].logo);
      } catch (err) {
        setLogo('../../img/Logo2.png');
      }
    }
  }, [company]);

  const calendarEvent = {
    title: events,
    description: eventDetails,
    start: selectedDate,
    location,
    duration: [1, 'hour'],
  };

  const calendarButton = () => {
    window.open(google(calendarEvent));
  };

  const clickLink = (link) => {
    if (link.substring(0, 4) !== 'http') {
      window.open(`http://${link}`);
    }
    return window.open(link);
  };

  const locationRender = () => {
    if (eventLocation.substring(0, 4) === 'http' || eventLocation.includes('.com') || eventLocation.includes('.ca') || eventLocation.includes('www.')) {
      return (
        <IconButton
          aria-label="click event location"
          onClick={() => clickLink(eventLocation)}
        >
          <OpenInNewSharpIcon />
        </IconButton>
      );
    } if (eventLocation !== '') {
      return (
        <IconButton
          aria-label="click event location"
          href={`https://www.google.com/maps/place/${eventLocation}`}
          target="_blank"
        >
          <LocationOnIcon />
        </IconButton>
      );
    }
    return null;
  };

  return (
    <div>

      <StylesProvider>

        <Grid container>
          <Dialog
            className="job-modal-background"
            onBackdropClick={onClose}
            onClick={(event) => {
              event.stopPropagation();
            }}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
          >

            <form className="job-modal-box" onSubmit={(event) => event.preventDefault()}>

              <DialogContent dividers style={{ padding: '20px' }}>
                {error && (
                <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
                  {error}
                </Alert>
                )}
                <div className="modal-top">
                  <img id="company-logo" src={logo} alt="" className="logo" />
                  <div className="modal-top-right">
                    <TextField
                      required
                      id="standard-basic"
                      label="Company Name"
                      className="modal-top-right-company"
                      name="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                    />
                    <TextField
                      required
                      id="standard-basic"
                      label="Job Title"
                      className="modal-top-right-title"
                      name="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <FormControl className="modal-top-right-status">
                      <InputLabel>
                        Status
                      </InputLabel>
                      <Select
                        native
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Status"
                        inputProps={{
                          name: 'status',
                          id: 'outlined-status-native-simple',
                        }}
                      >
                        <option value={0}>
                          Interested
                        </option>
                        <option value={1}>
                          Applied
                        </option>
                        <option value={2}>
                          Interviewing
                        </option>
                        <option value={3}>
                          Offers
                        </option>
                        <option value={4}>
                          Rejected
                        </option>
                      </Select>
                    </FormControl>
                    <FormControl className="modal-top-right-location">
                      <InputLabel>
                        Location
                      </InputLabel>
                      <Input
                        label="Location"
                        name="location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {location
                              ? (
                                <IconButton
                                  aria-label="click event location"
                                  href={`https://www.google.com/maps/place/${location}`}
                                  target="_blank"
                                >
                                  <LocationOnIcon />
                                </IconButton>
                              ) : false}
                          </InputAdornment>
                      )}
                      />
                    </FormControl>
                    <FormControl className="modal-top-right-url">
                      <InputLabel>
                        Job Link Url
                      </InputLabel>
                      <Input
                        label="Job Link Url"
                        name="url"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        endAdornment={(
                          <InputAdornment position="end">
                            {url
                              ? (
                                <IconButton
                                  aria-label="click url"
                                  onClick={() => clickLink(url)}
                                >
                                  <OpenInNewSharpIcon />
                                </IconButton>
                              ) : false}
                          </InputAdornment>
                      )}
                      />
                    </FormControl>
                    <FormControl className="modal-top-right-salary">
                      <InputLabel>
                        Salary
                      </InputLabel>
                      <Input
                        id="standard-basic"
                        value={salary > 0 ? salary : ''}
                        label="Salary"
                        name="salary"
                        onChange={(event) => setSalary(parseInt(event.target.value, 10))}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="modal-middle">
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    label="Details"
                    className="modal-middle-details"
                    name="details"
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                  />
                </div>
                <Box display="flex" flexDirection="row" pt={2}>
                  <Box display="flex" alignItems="center">
                    <h3 className="heading" style={{ padding: '0px' }}>
                      Events
                    </h3>
                  </Box>
                  { eventExpired && selectedDate ? (
                    <Box display="flex" alignContent="center" alignItems="center" mb={0.5}>
                      <NewReleasesIcon style={{
                        color: '#f94144', zIndex: 10, fontSize: '1em', marginLeft: '10px',
                      }}
                      />
                      <Typography variant="caption" style={{ marginTop: '3px', marginLeft: '3px', color: '#f94144' }}>The date for this event has passed</Typography>
                    </Box>
                  ) : null}
                </Box>
                <div className="event">
                  <TextField
                    id="standard-basic"
                    className="event-upcoming"
                    label="Upcoming Event"
                    value={events}
                    onChange={(event) => setEvents(event.target.value)}
                  />
                  <FormControl className="event-location">
                    <InputLabel>
                      Event Location
                    </InputLabel>
                    <Input
                      label="Event Location"
                      name="event location"
                      value={eventLocation}
                      onChange={(event) => setEventLocation(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {locationRender()}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className="event-calendar"
                      style={{ margin: 0 }}
                      disableToolbar
                      variant="outlined"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Calendar"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    label="Event Details"
                    className="event-details"
                    name="details"
                    value={eventDetails}
                    onChange={(event) => setEventDetails(event.target.value)}
                  />
                  {events
                    ? (
                      <Grow in={events} timeout={500}>
                        <Button
                          className="add-to-calendar"
                          variant="contained"
                          onClick={calendarButton}
                          color="secondary"
                          style={{ color: !events ? 'rgba(0,0,0,0.2)' : 'white' }}
                          disabled={!events}
                        >
                          <InsertInvitationSharpIcon style={{ marginRight: '10px' }} />
                          Add to Google Calendar
                        </Button>
                      </Grow>
                    ) : null}
                </div>
                <h3 className="heading">
                  Contact
                </h3>
                <div className="contact-info">
                  <TextField
                    id="standard-basic"
                    label="Contact Name"
                    className="contact-name"
                    name="contact_name"
                    value={contact_name}
                    onChange={(event) => setContact_name(event.target.value)}
                  />
                  <FormControl className="contact-email">
                    <InputLabel>
                      Contact Email
                    </InputLabel>
                    <Input
                      label="Contact Email"
                      name="contact_email"
                      value={contact_email}
                      onChange={(event) => setContact_email(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {contact_email
                            ? (
                              <IconButton
                                aria-label="click contact email"
                                href={`mailto:${contact_email}?subject=${title} - ${company}&body=Hello ${contact_name},`}
                                target="_blank"
                              >
                                <MailOutlineSharpIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <FormControl className="contact-phone">
                    <InputLabel>
                      Contact Phone Number
                    </InputLabel>
                    <Input
                      label="Contact Phone Number"
                      name="contact_phone"
                      value={contact_phone}
                      onChange={(event) => setContact_phone(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {contact_phone
                            ? (
                              <IconButton
                                aria-label="click contact phone"
                                href={`tel:${contact_phone}`}
                              >
                                <PhoneIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <FormControl className="contact-phone">
                    <InputLabel>
                      Contact Links
                    </InputLabel>
                    <Input
                      label="Contact Links"
                      name="contact_socialmedia"
                      value={contact_socialmedia}
                      onChange={(event) => setContact_socialmedia(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {contact_socialmedia
                            ? (
                              <IconButton
                                aria-label="click contact social media"
                                onClick={() => clickLink(contact_socialmedia)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                </div>
                <h3 className="heading">
                  Links
                </h3>
                <div className="links">
                  <FormControl className="links-inputfield">
                    <InputLabel>
                      Resume
                    </InputLabel>
                    <Input
                      label="Resume"
                      name="resume"
                      value={resume_url}
                      onChange={(event) => setResume_url(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {resume_url
                            ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(resume_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <FormControl className="links-inputfield">
                    <InputLabel>
                      Cover Letter
                    </InputLabel>
                    <Input
                      label="Cover Letter"
                      name="Cover Letter"
                      value={coverletter_url}
                      onChange={(event) => setCoverletter_url(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {coverletter_url
                            ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(coverletter_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                  <FormControl className="links-inputfield">
                    <InputLabel>
                      Additional Link
                    </InputLabel>
                    <Input
                      label="Additional Link"
                      name="extra links"
                      value={extra_url}
                      onChange={(event) => setExtra_url(event.target.value)}
                      endAdornment={(
                        <InputAdornment position="end">
                          {extra_url
                            ? (
                              <IconButton
                                aria-label="resume url"
                                onClick={() => clickLink(extra_url)}
                              >
                                <OpenInNewSharpIcon />
                              </IconButton>
                            ) : false}
                        </InputAdornment>
                      )}
                    />
                  </FormControl>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="buttons-bottom">
                  <div className="buttons-left">
                    {
                      isEditModal
                        ? (
                          <Button
                            type="click"
                            variant="contained"
                            startIcon={<DeleteIcon />}
                            onClick={() => setConfirmModalOpen(true)}
                            style={{ backgroundColor: '#F94144', color: 'white' }}
                          >
                            Delete
                          </Button>
                        )
                        : (
                          <Button
                            type="click"
                            variant="contained"
                            style={{ backgroundColor: '#a9a9a9', color: 'white' }}
                            startIcon={<RotateLeftIcon />}
                            onClick={() => reset()}
                          >
                            Reset Form
                          </Button>
                        )
                      }

                  </div>
                  <div className="buttons-right">
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '10px' }}
                      startIcon={<CancelIcon />}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      variant="contained"
                      color="secondary"
                      style={{ color: 'white' }}
                      startIcon={<SaveIcon />}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
        <ModalConfirm id="modal-confirm-delete" open={confirmModalOpen} onConfirm={handleDelete} onDecline={() => setConfirmModalOpen(false)} />
      </StylesProvider>
    </div>
  );
};

JobsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  companyName: PropTypes.string,
  jobTitle: PropTypes.string,
  jobDetails: PropTypes.string,
  jobLocation: PropTypes.string,
  id: PropTypes.number,
  jobSalary: PropTypes.number,
  jobStatus: PropTypes.number,
  jobUrl: PropTypes.string,
  jobContact_name: PropTypes.string,
  jobContact_email: PropTypes.string,
  jobContact_phone: PropTypes.string,
  jobContact_socialmedia: PropTypes.string,
  jobResume_url: PropTypes.string,
  jobCoverletter_url: PropTypes.string,
  jobExtra_url: PropTypes.string,
  isEditModal: PropTypes.bool,
  event_title: PropTypes.string,
  event_expired: PropTypes.bool,
  event_details: PropTypes.string,
  event_date: PropTypes.string,
  event_location: PropTypes.string,
};

JobsModal.defaultProps = {
  open: false,
  isEditModal: false,
  companyName: '',
  jobTitle: '',
  jobDetails: '',
  jobLocation: '',
  id: undefined,
  jobSalary: 0,
  jobStatus: undefined,
  jobUrl: '',
  jobContact_name: '',
  jobContact_email: '',
  jobContact_phone: '',
  jobContact_socialmedia: '',
  jobResume_url: '',
  jobCoverletter_url: '',
  jobExtra_url: '',
  event_title: '',
  event_expired: false,
  event_details: '',
  event_date: '',
  event_location: '',
};

export default JobsModal;
