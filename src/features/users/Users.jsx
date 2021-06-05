import React, { useEffect } from "react";
import axios from 'axios';

export const Users = () => {
  useEffect(() => {
    axios.get("/api/users")
      .then(res => console.log(res))
  }, [])

  return (
    <div><h1>Users</h1></div>
  )
}
