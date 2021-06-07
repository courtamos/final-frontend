import React, { useEffect } from 'react';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import GoogleMaps from '../components/Location-input';
import DatePicker from '../components/DatePicker';
import SalaryInput from '../components/Salary';
import AddToCalendar from '../components/AddToCalendar'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: 500,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

export default function JobsModal() {
  const [open, setOpen] = React.useState(false);
  const classes = styles;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AddBoxIcon onClick={handleClickOpen} />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="sm">
        <DialogContent dividers>
          <div>
            <TextField id="outlined-basic" label="Company Name" variant="outlined" />
          </div>
          <div>
            <TextField id="outlined-basic" label="Job Title" variant="outlined" />
          </div>
          <div>
            <GoogleMaps />
          </div>
          <div>
            <TextField id="outlined-basic" label="Job Link Url" variant="outlined" />
          </div>
          <div>
            <SalaryInput />
          </div>
          <div>
          <TextField id="outlined-multiline-static" label="Details" multiline rows={4} variant="outlined"/>
          </div>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Events
        </DialogTitle>
        <DialogTitle display="flex">
          <TextField id="outlined-basic" label="Upcoming Event" variant="outlined" />
          <DatePicker />
          <AddToCalendar />
        </DialogTitle>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}