import React, { useEffect } from 'react';
import axios from 'axios';

const Jobs = () => {
  useEffect(() => {
    axios.get('/api/jobs')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div><h1>Jobs</h1></div>
  );
};

export default Jobs;
