import React from 'react';
import Ep1and2 from './Ep1and2';

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
      <Ep1and2 />
      {/* <Ep3and4 /> */}
    </div>
  )
}