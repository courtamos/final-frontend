import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const UpdateModal = (props) => {
  const { open, onConfirm, onDecline } = props;

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to update your account information?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDecline}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UpdateModal.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
};

UpdateModal.defaultProps = {
  open: false,
  onConfirm: () => {},
  onDecline: () => {},
};

export default UpdateModal;
