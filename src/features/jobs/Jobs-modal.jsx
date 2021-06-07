import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import GoogleMaps from '../components/Location-input';
import DatePicker from '../components/DatePicker';
import SalaryInput from '../components/Salary';
import AddToCalendar from '../components/AddToCalendar';
import Status from '../components/Status';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}))

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

export default function JobsModal(props) {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("")
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState(0)
  const [salary, setSalary] = useState(0)
  const [url, setUrl] = useState("")
  const [location, setLocation] = useState("")
  const [details, setDetails] = useState("")
  const [contact_name, setContact_name] = useState("")
  const [contact_email, setContact_email] = useState("")
  const [contact_phone, setContact_phone] = useState("")
  const [contact_socialmedia, setContact_socialmedia] = useState("")

  // const [state, setState] = useState({
  //   title: "",
  //   company: "",
  //   status: 0,
  //   salary: 0,
  //   url: "",
  //   location: "",
  //   details: "",
  //   contact_name: "",
  //   contact_email: "",
  //   contact_phone: "",
  //   contact_socialmedia: "",
  // });

  function reset() {
    setCompany("");
    setTitle("");
    setSalary(0);
    setStatus(0);
    setUrl("");
    setLocation("");
    setDetails("");
    setContact_name("");
    setContact_email("");
    setContact_phone("");
    setContact_socialmedia("");
  }

  useEffect(() => {
    axios.get('/api/jobs')
      .then(res => console.log("JOB DATA",res))
  }, [])

  const classes = useStyles();
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset()
  };

  const handleSubmit = (event) => {
    if (company === "") {
      console.log("Company Name Cannot be blank");
    } else if (title === "") {
      console.log("Title Cannot be blank");
    } else {
      const jobObject = {company, title, status, salary, url, location, details, contact_name, contact_email, contact_phone, contact_socialmedia}
      console.log(jobObject);
      axios.post('/api/jobs', jobObject).then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  // const {title, company, status, salary, url, location, details, contact_name, contact_email, contact_phone, contact_socialmedia} = state

  return (
   <div>
      <Grid container>
        <AddBoxIcon onClick={handleClickOpen} />
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
          <form onSubmit={(event) => event.preventDefault()}>
            <DialogContent dividers >
              <div>
                <TextField required id="outlined-basic" label="Company Name" variant="outlined" className={classes.textField} name='company' value={company} onChange={(event) => setCompany(event.target.value)} />
                <Status value={status} onChange={(event) => setStatus(event.target.value)}/>
              </div>
              <div>
                <TextField required id="outlined-basic" label="Job Title" variant="outlined" className={classes.textField} name='title'  value={title} onChange={(event) => setTitle(event.target.value)}/>
              </div>
              <div>
                <GoogleMaps className={classes.textField} name='location'  value={location} onChange={(event) => setLocation(event.target.value)}/>
              </div>
                <TextField id="outlined-basic" label="Job Link Url" variant="outlined" className={classes.textField} name='url' value={url} onChange={(event) => setUrl(event.target.value)}/>
                <SalaryInput className={classes.textField} name='salary' value={salary} onChange={(event) => setSalary(event.target.value)}/>
              <div>
              </div>
              <div>
              </div>
              <div>
              <TextField id="outlined-multiline-static" label="Details" multiline rows={4} variant="outlined" className={classes.textField} name='details' value={details} onChange={(event) => setDetails(event.target.value)}/>
              </div>
              <h3 className={classes.textField}>Contact</h3>
              <div>
                <TextField id="outlined-basic" label="Contact Name" variant="outlined" className={classes.textField} name='contact_name' value={contact_name} onChange={(event) =>setContact_name(event.target.value)}/>
                <TextField id="outlined-basic" label="Contact Email" variant="outlined" className={classes.textField} name='contact_email' value={contact_email} onChange={(event) =>setContact_email(event.target.value)}/>
                <TextField id="outlined-basic" label="Contact Phone Number" variant="outlined" className={classes.textField} name='contact_phone' value={contact_phone} onChange={(event) =>setContact_phone(event.target.value)}/>
                <TextField id="outlined-basic" label="Contact Links (LinkedIn)" variant="outlined" className={classes.textField} name='contact_socialmedia' value={contact_socialmedia} onChange={(event) =>setContact_socialmedia(event.target.value)}/>
              </div>
              <h3 className={classes.textField}>Events</h3>
              <TextField id="outlined-basic" label="Upcoming Event" variant="outlined" className={classes.textField} />
              <DatePicker />
              <AddToCalendar />
            </DialogContent>
            <DialogActions>
              <Button type="submit" autoFocus onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" onClick={(event) => handleSubmit()} color="primary">
                Save changes
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </div>
  );
}

   