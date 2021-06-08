/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles, StylesProvider } from '@material-ui/core/styles';
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
import { SideBarButton } from '../common/SideBarButton';

import './Jobs-modal.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
  link: {
    color: 'black',
  },
  icon: {
    fontSize: '50px',
  },
  add: {
    color: 'black',
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const JobsModal = () => {
  const [open, setOpen] = useState(false);
  const user_id = 1;
  const job_id = 1;
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);
  const [salary, setSalary] = useState(0);
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [contact_name, setContact_name] = useState('');
  const [contact_email, setContact_email] = useState('');
  const [contact_phone, setContact_phone] = useState('');
  const [contact_socialmedia, setContact_socialmedia] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [events, setEvents] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventLocation, setEventLocation] = useState('');

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
    setEventDetails('');
    setEventLocation('');
  }

  useEffect(() => {
    axios.get('/api/jobs')
      .then((res) => console.log('JOB DATA', res));
  }, []);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    if (company === '') {
      console.log('Company Name Cannot be blank');
    } else if (title === '') {
      console.log('Title Cannot be blank');
    } else {
      const jobObject = {
        user_id,
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
      const eventsObject = {
        job_id,
        title: events,
        date: selectedDate,
        details: eventDetails,
        location: eventLocation,
      };
      console.log(eventsObject);
      Promise.all([axios.post('/api/jobs', jobObject)], [axios.post('/api/events', eventsObject)]).then(() => {
        handleClose();
      })
        .catch((err) => {
          console.log(err);
        });
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
    duration: [3, 'hour'],
  };

  const calendarButton = () => {
    window.open(google(calendarEvent));
  };

  return (
    <div>
      <StylesProvider>
        <Grid container>
          <SideBarButton onClick={handleClickOpen}>
            <AddIcon className={`${classes.icon} ${classes.add}`} />
          </SideBarButton>
          <Dialog className="job-modal-background" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
            <form className="job-modal-box" onSubmit={(event) => event.preventDefault()}>
              <DialogContent dividers>
                <div>
                  <div id="company-logo-holder">
                    <img id="company-logo" src={companyLogo()} alt="" />
                  </div>
                  <TextField required id="standard-basic" label="Company Name" className={classes.textField} name="company" value={company} onChange={(event) => setCompany(event.target.value)} />
                  <div>
                    <FormControl id="demo-simple-select" className={classes.formControl}>
                      <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
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
                        <option value={0}>Interested</option>
                        <option value={1}>Applied</option>
                        <option value={2}>Interviewing</option>
                        <option value={3}>Offers</option>
                        <option value={4}>Rejected</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div>
                  <TextField required id="standard-basic" label="Job Title" className={classes.textField} name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                  {/* <GoogleMaps className={classes.textField} name="location"/> */}
                  <TextField id="standard-basic" label="Location" className={classes.textField} name="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <TextField id="standard-basic" label="Job Link Url" className={classes.textField} name="url" value={url} onChange={(event) => setUrl(event.target.value)} />
                <TextField id="standard-basic" type="number" label="Salary" className={classes.textField} name="salary" value={salary} onChange={(event) => setSalary(parseInt(event.target.value, 10))} />
                <div />
                <div />
                <div>
                  <TextField id="standard-multiline-flexible" multiline label="Details" className={classes.textField} name="details" value={details} onChange={(event) => setDetails(event.target.value)} />
                </div>
                <h3 className={classes.textField}>Contact</h3>
                <div>
                  <TextField id="standard-basic" label="Contact Name" className={classes.textField} name="contact_name" value={contact_name} onChange={(event) => setContact_name(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Email" className={classes.textField} name="contact_email" value={contact_email} onChange={(event) => setContact_email(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Phone Number" className={classes.textField} name="contact_phone" value={contact_phone} onChange={(event) => setContact_phone(event.target.value)} />
                  <TextField id="standard-basic" label="Contact Links (LinkedIn)" className={classes.textField} name="contact_socialmedia" value={contact_socialmedia} onChange={(event) => setContact_socialmedia(event.target.value)} />
                </div>
                <h3 className={classes.textField}>Events</h3>
                <TextField id="standard-basic" label="Upcoming Event" value={events} onChange={(event) => setEvents(event.target.value)} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="outlined"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Button onClick={calendarButton}>
                  <InsertInvitationSharpIcon />
                  Add to Google Calendar
                </Button>
                <TextField id="standard-multiline-flexible" multiline label="Details" className={classes.textField} name="details" value={eventDetails} onChange={(event) => setEventDetails(event.target.value)} />
                <TextField id="standard-basic" label="Event Location" className={classes.textField} name="event location" value={eventLocation} onChange={(event) => setEventLocation(event.target.value)} />
                <SideBarButton>
                  <AddIcon className={`${classes.icon} ${classes.add}`} />
                </SideBarButton>
              </DialogContent>
              <DialogActions>
                <Button type="submit" autoFocus onClick={handleClose} variant="contained" color="default">
                  Cancel
                </Button>
                <Button type="submit" onClick={() => handleSubmit()} variant="contained" color="primary">
                  Save changes
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </StylesProvider>
    </div>
  );
};

export default JobsModal;
