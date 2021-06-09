/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles, StylesProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useDebounce } from 'use-debounce';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
// import GoogleMaps from '../../components/Location-input';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  google,
} from 'calendar-link';
import InsertInvitationSharpIcon from '@material-ui/icons/InsertInvitationSharp';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// import { SideBarButton } from '../common/SideBarButton';

import './Jobs-modal.scss';
import { authSelector } from '../auth/authSlice';
import { addJob } from './jobs/jobsSlice';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
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
  } = props;

  const user_id = id;
  const [company, setCompany] = useState(companyName || '');
  const [title, setTitle] = useState(jobTitle || '');
  const [status, setStatus] = useState(jobStatus || 0);
  const [salary, setSalary] = useState(jobSalary || null);
  const [url, setUrl] = useState(jobUrl || '');
  const [location, setLocation] = useState(jobLocation || '');
  const [details, setDetails] = useState(jobDetails || '');
  const [contact_name, setContact_name] = useState(jobContact_name || '');
  const [contact_email, setContact_email] = useState(jobContact_email || '');
  const [contact_phone, setContact_phone] = useState(jobContact_phone || '');
  const [contact_socialmedia, setContact_socialmedia] = useState(jobContact_socialmedia || '');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [events, setEvents] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [error, setError] = useState('');

  function reset() {
    setCompany('');
    setTitle('');
    setSalary(null);
    setStatus(0);
    setUrl('');
    setLocation('');
    setDetails('');
    setContact_name('');
    setContact_email('');
    setContact_phone('');
    setContact_socialmedia('');
    setEvents('');
    setEventDetails('');
    setEventLocation('');
    setSelectedDate(new Date(Date.now()));
  }

  const handleClose = () => {
    reset();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async () => {
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
    };

    const event = {
      title: events,
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
    if (!event.title && !event.date && !event.details && !event.location) {
      actionResult = await dispatch(addJob({ job }));
    } else {
      actionResult = await dispatch(addJob({ job, event }));
    }

    if (addJob.rejected.match(actionResult)) {
      setError('Adding new job failed, try again');
    } else if (addJob.fulfilled.match(actionResult)) {
      handleClose();
    }
  };

  const debouncedText = useDebounce(company.replace(/\s/g, ''), 10);

  const companyLogo = () => {
    if (company.length > 0) {
      return `//logo.clearbit.com/${debouncedText[0]}.com`;
    }
    return 'https://i.imgur.com/n7X5rsl.png';
  };

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

  return (
    <div>
      <StylesProvider>
        <Grid container>

          <Dialog className="job-modal-background" onBackdropClick={() => { alert(onClose); }} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
            <form className="job-modal-box" onSubmit={(event) => event.preventDefault()}>
              <DialogContent dividers>
                <div className="modal-top">
                  {error && (
                  <Alert severity="error" fullWidth style={{ marginBottom: '10px' }}>
                    {error}
                  </Alert>
                  )}
                  <img id="company-logo" src={companyLogo()} alt="" className="logo" />
                  <div className="modal-top-right">
                    <TextField
                      required
                      id="standard-basic"
                      label="Company Name"
                      className="content"
                      name="company"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                    />
                    <FormControl id="demo-simple-select" className="status-selector" style={{ marginLeft: 15 }}>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Status
                      </InputLabel>
                      <Select
                        native
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        label="Status"
                        inputProps={{
                          name: 'status',
                          id: 'outlined-age-native-simple',
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
                    <TextField
                      required
                      id="standard-basic"
                      label="Job Title"
                      className="content"
                      name="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                      id="standard-basic"
                      label="Location"
                      className="content-location"
                      style={{ marginLeft: 15 }}
                      name="location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-middle">
                  <TextField
                    id="standard-basic"
                    label="Job Link Url"
                    className="modal-middle-url"
                    name="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    type="number"
                    label="Salary"
                    className="modal-middle-salary"
                    name="salary"
                    style={{ marginLeft: 11.2 }}
                    value={salary}
                    onChange={(event) => setSalary(parseInt(event.target.value, 10))}
                  />
                  <TextField
                    id="standard-multiline-flexible"
                    multiline
                    label="Details"
                    className="modal-middle-details"
                    style={{ marginTop: 5 }}
                    name="details"
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                  />
                </div>
                <h3 className="heading">
                  Events
                </h3>
                <div className="event">

                  <TextField
                    id="standard-basic"
                    className="event-upcoming"
                    label="Upcoming Event"
                    value={events}
                    onChange={(event) => setEvents(event.target.value)}
                  />
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
                    style={{ marginTop: 5 }}
                    name="details"
                    value={eventDetails}
                    onChange={(event) => setEventDetails(event.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Event Location"
                    className="event-location"
                    style={{ marginTop: 5 }}
                    name="event location"
                    value={eventLocation}
                    onChange={(event) => setEventLocation(event.target.value)}
                  />
                </div>
                <div className="eventHeader">
                  <h3 className="heading">
                    Contact
                  </h3>
                  <Button
                    className="add-to-calendar"
                    variant="contained"
                    onClick={calendarButton}
                    color="secondary"
                    style={{ marginLeft: 10, backgroundColor: '#34acba' }}
                  >
                    <InsertInvitationSharpIcon />
                    <h5 style={{ marginLeft: 5 }}>
                      Add to Google Calendar
                    </h5>
                  </Button>
                </div>
                <div className="contact-info">
                  <TextField
                    id="standard-basic"
                    label="Contact Name"
                    className="contact-name"
                    name="contact_name"
                    value={contact_name}
                    onChange={(event) => setContact_name(event.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Contact Email"
                    className="contact-email"
                    name="contact_email"
                    value={contact_email}
                    onChange={(event) => setContact_email(event.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Contact Phone Number"
                    className="contact-phone"
                    style={{ marginTop: 5 }}
                    name="contact_phone"
                    value={contact_phone}
                    onChange={(event) => setContact_phone(event.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="Contact Links (LinkedIn)"
                    className="contact-social"
                    style={{ marginTop: 5 }}
                    name="contact_socialmedia"
                    value={contact_socialmedia}
                    onChange={(event) => setContact_socialmedia(event.target.value)}
                  />
                </div>

              </DialogContent>
              <DialogActions>
                <div className="buttons-bottom">
                  <div className="buttons-left">
                    <Button
                      type="click"
                      variant="contained"
                      style={{ backgroundColor: '#ee6a7c', color: 'white' }}
                      startIcon={<DeleteIcon />}
                    >
                      <h5 style={{ margin: 2 }}>
                        Delete
                      </h5>
                    </Button>
                  </div>
                  <div className="buttons-right">
                    <Button type="button" autoFocus onClick={onClose} style={{ backgroundColor: '#ffe7d6' }} variant="contained" color="default">
                      <h5 style={{ margin: 2 }}>Cancel</h5>
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: '#34acba' }}
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                    >
                      <h5 style={{ margin: 2 }}>
                        Save
                      </h5>
                    </Button>
                  </div>
                </div>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </StylesProvider>
    </div>
  );
};

JobsModal.propTypes = {
  open: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  companyName: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  jobDetails: PropTypes.string.isRequired,
  jobLocation: PropTypes.string.isRequired,
  jobSalary: PropTypes.number.isRequired,
  jobStatus: PropTypes.number.isRequired,
  jobUrl: PropTypes.string.isRequired,
  jobContact_name: PropTypes.string.isRequired,
  jobContact_email: PropTypes.string.isRequired,
  jobContact_phone: PropTypes.string.isRequired,
  jobContact_socialmedia: PropTypes.string.isRequired,
};

JobsModal.defaultProps = {
  open: false,
};

export default JobsModal;
