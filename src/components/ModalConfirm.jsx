import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const ModalConfirm = (props) => {
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
          Are you sure you want to delete this job?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDecline} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
};

ModalConfirm.defaultProps = {
  open: false,
  onConfirm: () => {},
  onDecline: () => {},
};

export default ModalConfirm;
