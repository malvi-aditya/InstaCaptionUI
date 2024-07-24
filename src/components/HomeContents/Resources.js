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
          <a
            href={
              "https://stackoverflow.com/questions/56885037/react-batch-updates-for-multiple-setstate-calls-inside-useeffect-hook"
            }
            target="_blank"
          >
            https://stackoverflow.com/questions/56885037/react-batch-updates-for-multiple-setstate-calls-inside-useeffect-hook
          </a>
          <br />
          <a href={"https://javascript.info/ninja-code"} target="_blank">
            https://javascript.info/ninja-code
          </a>
          <br />
          <a
            href={
              "https://www.youtube.com/playlist?list=PL55RiY5tL51rcCnrOrZixuOsZhAHHy6os"
            }
            target="_blank"
          >
            Webpack Basics: https://javascript.info/ninja-code
          </a>
          <br />
          <a href={"https://google.github.io/styleguide/"} target="_blank">
            https://google.github.io/styleguide/
          </a>
          <br />
        </div>
        <div className={classes.content}>
          <p>
            {" "}
            React Routers working etc. , Virtual DOM, Event Listeners
            everything, Polyfills (setTimeout etc.){" "}
          </p>
          <p> Design architecture of ui, apis and the flow of everything. </p>
          <p>
            {" "}
            Performance Improvement techniques, freezing or slow ui issues etc.{" "}
          </p>
          <p>
            Event Delegation, react suspense, react.memo, render props, HOCs,
            performance optimization in virtual DOM, React.lazy, lazy Loading{" "}
          </p>
        </div>
      </div>
    </>
  );
}
