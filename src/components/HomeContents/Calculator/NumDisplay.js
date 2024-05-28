import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, auto)",
    gap: "10px",
  },
  gridItem: {
    padding: "10px",
    border: "1px solid #ccc",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    textAlign: "center",
  },
}));

const num = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
  {
    id: 9,
  },
];

export default function NumDisplay(props) {
  const { setCurr, reset, setReset } = props;
  const classes = useStyles();
  return (
    <div className={classes.gridContainer}>
      {num.map((obj) => {
        return (
          <div
            className={classes.gridItem}
            onClick={() => {
              if (reset) {
                setCurr(`${obj.id}`);
                setReset(false);
              } else setCurr((val) => val + obj.id);
            }}
          >
            {obj.id}
          </div>
        );
      })}
    </div>
  );
}
