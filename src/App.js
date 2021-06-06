import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Users } from "./features/users/Users";
import { Jobs } from "./features/jobs/Jobs";
import { Events } from "./features/events/Events";
import { AppBar, Toolbar, Grid, makeStyles } from "@material-ui/core";
import "./App.css";

const useStyles = makeStyles({
  appMain: {
    width: "100%",
  },
});

function App() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className={classes.appMain}>
      <Jobs />
    </div>
  );
}

export default App;
