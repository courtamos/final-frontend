import React, { useEffect } from "react";
import axios from 'axios';

export const Users = () => {
  useEffect(() => {
    axios.get('/api/users')
      .then(res => console.log(res))

    axios.get('/api/nothere')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }, [])

  return (
    <div><h1>Users</h1></div>
  )
}
