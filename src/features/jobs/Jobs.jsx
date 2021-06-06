import React, { useEffect } from "react";
import axios from 'axios';
import { Paper, Grid, makeStyles } from '@material-ui/core'
import JobsModal from './Jobs-modal';

const useStyles = makeStyles(theme => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  }
}))

export const Jobs = () => {
  const classes = useStyles();

  useEffect(() => {
    axios.get('/api/jobs')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])

  

  return (
    <>
    <Paper className={classes.pageContent}>
      <JobsModal />
    </Paper>
    </>
  )
}