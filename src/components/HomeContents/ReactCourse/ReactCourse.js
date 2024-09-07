import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Ep1and2 from './Ep1and2';
import Ep3and4and5 from './Ep3and4and5';
import Ep6and7 from './Ep6and7';
import Ep8and9and10 from './Ep8and9and10';
import Ep11and12 from './Ep11and12';
import ExtraHooks from './ExtraHooks';

const useStyles = makeStyles(() => ({
  root: {
    display:'flex',
    marginTop: '10px',
    flexDirection: 'column',
  },
}));

export default function ReactCourse() {
  const classes = useStyles();
  return (
    <div class={classes.root}>
      <Ep1and2 />
      <Ep3and4and5 />
      <Ep6and7 />
      <Ep8and9and10 />
      <Ep11and12 />
      <ExtraHooks />
    </div>
  )
}