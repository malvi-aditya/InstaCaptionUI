import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(4, auto)",
    gap: "10px",
    paddingTop: "16px",
  },
  gridItem: {
    padding: "10px",
    border: "1px solid #ccc",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
    alignItems: "center",
    textAlign: "center",
  },
}));

const op = [
  {
    id: "+",
  },
  {
    id: "-",
  },
  {
    id: "/",
  },
  {
    id: "x",
  },
];

export default function OpDisplay(props) {
  const classes = useStyles();
  const { setOp, curr, setN1, setReset, op: oper, n1, setCurr } = props;
  return (
    <div className={classes.gridContainer}>
      {op.map((obj) => {
        return (
          <div
            className={classes.gridItem}
            onClick={() => {
            }}
          >
            {obj.id}
          </div>
        );
      })}
    </div>
  );
}
