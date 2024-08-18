import React from 'react';
import Ep1 from './Ep1';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display:'flex',
    marginTop: '10px',
  },
}));

export default function ReactCourse() {
  const classes = useStyles();
  return (
    <div class={classes.root}>
      <Ep1 />
    </div>
  )
}