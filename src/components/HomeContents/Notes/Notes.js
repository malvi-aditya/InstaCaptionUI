import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JSNotes from "./JSNotes";
import ReactNotes from "./ReactNotes";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const useStyles = makeStyles(() => ({
  listItem: {
    display: "flex",
    gap: "5px",
  },
}));

export default function Notes(props) {
  const classes = useStyles(props);
  const [js, setJS] = useState(false);
  const [react, setReact] = useState(false);
  return (
    <>
      <>
        <div className={classes.listItem}>
          <b>JavaScript:</b>
          <div onClick={() => setJS((val) => !val)}>
            {js ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {js && <JSNotes />}
        <div className={classes.listItem}>
          <b>React:</b>
          <div onClick={() => setReact((val) => !val)}>
            {react ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {react && <ReactNotes />}
      </>
    </>
  );
}
