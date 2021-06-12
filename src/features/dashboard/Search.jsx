/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import {
  jobsSelector,
  selectInterestedJobs,
  selectAppliedJobs,
  selectInterviewingJobs,
  selectOfferJobs,
  selectRejectedJobs,
} from './jobs/jobsSlice';
import JobItem from '../../components/JobItem';

const Search = () => {
  const { jobs } = useSelector(jobsSelector);
  const interestedJobs = useSelector(selectInterestedJobs);
  const appliedJobs = useSelector(selectAppliedJobs);
  const interviewingJobs = useSelector(selectInterviewingJobs);
  const offerJobs = useSelector(selectOfferJobs);
  const rejectedJobs = useSelector(selectRejectedJobs);

  const [searchValue, setSearchValue] = useState('');
  const [filteredJobs, setFilteredjobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState(undefined);

  const getFilteredJobs = (selectedJobs) => selectedJobs.filter((job) => {
    const searchValueLowerCase = searchValue.toLocaleLowerCase();
    for (const key in job) {
      if (key !== 'events') {
        if (job[key] && job[key].toString().toLowerCase().includes(searchValueLowerCase)) {
          return true;
        }
      }
    }
    return false;
  });

  useEffect(() => {
    const statusObject = {
      0: interestedJobs, 1: appliedJobs, 2: interviewingJobs, 3: offerJobs, 4: rejectedJobs,
    };
    const jobSelection = statusObject[filterStatus] || jobs;
    const filtered = getFilteredJobs(jobSelection);
    setFilteredjobs(filtered);
  }, [searchValue, filterStatus, jobs]);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  const handleSelectStatus = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container
      maxWidth="md"
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <FormControl variant="outlined" style={{ flexGrow: '1' }}>
          <InputLabel style={{
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <SearchIcon style={{ marginRight: '5px' }} />
            {' '}
            Search Your Jobs
          </InputLabel>
          <OutlinedInput
            labelWidth={160}
            fullWidth
            id="outlined-adornment-amount"
            endAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
              )}
            value={searchValue}
            onChange={handleSearchInput}
            style={{ marginBottom: '25px' }}
          />
        </FormControl>

        <FormControl variant="outlined" style={{ marginLeft: '25px', width: '250px' }}>
          <InputLabel htmlFor="outlined-age-native-simple">Select Job Status</InputLabel>
          <Select
            native
            value={filterStatus}
            onChange={handleSelectStatus}
            label="Select Job Status"
            inputProps={{
              name: 'status',
              id: 'outlined-age-native-simple',
            }}
          >
            <option aria-label="None" value={undefined} />
            <option value={0}>Interested</option>
            <option value={1}>Applied</option>
            <option value={2}>Interviewing</option>
            <option value={3}>Offers</option>
            <option value={4}>Rejected</option>
          </Select>
        </FormControl>
      </div>

      {filteredJobs.length ? (
        <>
          {filteredJobs.map((job) => (
            <JobItem
              key={job.id}
              id={job.id}
              company={job.company}
              title={job.title}
              description={job.details}
              location={job.location}
              salary={job.salary}
              status={job.status}
              url={job.url}
              contact_name={job.contact_name}
              contact_phone={job.contact_phone}
              contact_email={job.contact_email}
              contact_socialmedia={job.contact_socialmedia}
              resume_url={job.resume_url}
              coverletter_url={job.coverletter_url}
              extra_url={job.extra_url}
              event_title={job.events.length > 0 ? job.events[0].title : ''}
              event_details={job.events.length > 0 ? job.events[0].details : ''}
              event_date={job.events.length > 0 ? job.events[0].date : ''}
              event_location={job.events.length > 0 ? job.events[0].location : ''}
              event_jobid={job.events.length > 0 ? job.events[0].job_id : undefined}
              event_id={job.events.length > 0 ? job.events[0].id : undefined}
            />
          ))}
        </>
      ) : (
        <Box>
          <h3>No Results Found</h3>
        </Box>
      )}
    </Container>
  );
};

export default Search;
