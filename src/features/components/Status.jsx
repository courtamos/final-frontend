import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));

export default function Status() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    status: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const { name } = event.target;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
        <Select
          native
          value={state.status}
          onChange={handleChange}
          label="Status"
          inputProps={{
            name: 'status',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Interested</option>
          <option value={20}>Applied</option>
          <option value={30}>Interviewing</option>
          <option value={30}>Offers</option>
          <option value={30}>Rejected</option>
        </Select>
      </FormControl>
    </div>
  );
}
