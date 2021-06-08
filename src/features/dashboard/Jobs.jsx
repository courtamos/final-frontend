import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import JobsModal from './Jobs-modal';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const Jobs = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.pageContent}>
        <JobsModal />
      </Paper>
    </>
  );
};

export default Jobs;
