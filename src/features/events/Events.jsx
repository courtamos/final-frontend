import React, { useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  useEffect(() => {
    axios.get('/api/events')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div><h1>Events</h1></div>
  );
};

export default Events;
