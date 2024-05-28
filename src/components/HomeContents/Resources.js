import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  content: {
    paddingTop: "8px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
}));

export default function Resources(props) {
  const classes = useStyles(props);
  return (
    <>
      <h4> Do these topics! </h4>
      <div className={classes.gridContainer}>
        <div className={classes.content}>
          <p>Frontend master Intro to react </p>
          <p>Frontend master Lighthouse (improving react)</p>
          <p>All React hooks</p>
          <p>Namaste Javascript Season 1, Season 2 </p>
          <p>
            Javascript Akshay saini videos , call bind apply , debouncing
            etc.....
          </p>
          <p>DOM manipulation (pepcoding , webdevsimplified)</p>
          <p>CORS preflights, CSS Position, CSS Display</p>

          <p>Javascript , react , HTML , css interviewbit </p>
          <p>
            Js array.sort() sorts lexicographically converting to string, so
            pass a custom function to convert to int sorting/ascending
          </p>
          <a
            href={
              "https://www.youtube.com/watch?v=Tnp3yX9Z93Q&ab_channel=SemicolonGuy"
            }
            target="_blank"
          >
            CRP:
            https://www.youtube.com/watch?v=Tnp3yX9Z93Q&ab_channel=SemicolonGuy
          </a>
          <br />
          <br/>
          <a
            href={
              "https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&ab_channel=AkshaySaini"
            }
            target="_blank"
          >
            https://www.youtube.com/watch?v=pN6jk0uUrD8&list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&ab_channel=AkshaySaini
          </a>
        </div>
        <div className={classes.content}>
          <p>
            {" "}
            React Routers working etc. , Virtual DOM, Event Listeners
            everything.{" "}
          </p>
          <p> Design architecture of ui, apis and the flow of everything. </p>
          <p>
            {" "}
            Performance Improvement techniques, freezing or slow ui issues etc.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
