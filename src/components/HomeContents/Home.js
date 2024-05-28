import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Resources from "./Resources";
import Calculator from "./Calculator/Calculator";
import Notes from "./Notes/Notes";
import Experimenting from './Experimenting'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "16px",
    marginLeft: "32px",
    display: "flex",
    flexDirection: "column",
  },
  tabContainer: {
    overflowY: "auto",
  },
}));

const tabConfig = [
  {
    id: 0,
    name: "Study Material",
  },
  {
    id: 1,
    name: "Calculator",
  },
  {
    id: 2,
    name: "Notes",
  },
  {
    id: 3,
    name: "Experimenting",
  },
];

export default function Home(props) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const tabContentRef = useRef(null);

  useEffect(() => {
    // Adjust the height of the tab content container when the component mounts
    adjustTabContentHeight();
    // Re-adjust the height when the window is resized
    window.addEventListener('resize', adjustTabContentHeight);
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', adjustTabContentHeight);
    };
  }, [tab]);

  const adjustTabContentHeight = () => {
    // Calculate the height of the available space
    const availableHeight = window.innerHeight - tabContentRef.current.offsetTop;
    // Set the height of the tab content container
    tabContentRef.current.style.height = `${availableHeight}px`;
  };

  return (
    <div className={classes.root}>
      <h3>Hey there!</h3>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={(event, val) => setTab(val)}>
          {tabConfig.map((obj) => {
            return <Tab label={obj.name} id={obj.id} />;
          })}
        </Tabs>
      </Box>
      <div ref={tabContentRef} className={classes.tabContainer}>
        {tab === 0 ? (
          <Resources classes={classes} />
        ) : tab === 1 ? (
          <Calculator />
        ) : tab === 2 ? (
          <Notes />
        ): (
          <Experimenting />
        )}
      </div>
    </div>
  );
}
