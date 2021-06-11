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

import { jobsSelector } from './jobs/jobsSlice';
import JobItem from '../../components/JobItem';

const Search = () => {
  const { jobs } = useSelector(jobsSelector);

  const [searchValue, setSearchValue] = useState('');
  const [filteredJobs, setFilteredjobs] = useState([]);

  useEffect(() => {
    const searchValueLowerCase = searchValue.toLocaleLowerCase();
    const filtered = jobs.filter((job) => {
      if (searchValueLowerCase && (job.company.toLowerCase().includes(searchValueLowerCase)
      || job.title.toLowerCase().includes(searchValueLowerCase))) {
        return true;
      }
      return false;
    });
    setFilteredjobs(filtered);
  }, [searchValue, jobs]);

  const handleSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue('');
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
      <FormControl variant="outlined">
        <OutlinedInput
          fullWidth
          placeholder="Search your jobs"
          id="outlined-adornment-amount"
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
            )}
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
        <Box paddingTop="20px">
          <h3>No Results Found</h3>
        </Box>
      )}
    </Container>
  );
};

export default Search;
