import React from "react";
import Button from "@mui/material/Button";

export default function ButtonMui(props) {
  const { color, text, onClick, className, ...rest } = props;
  return (
    <>
      <Button
        type="button"
        style={{ backgroundColor: color }}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {text}
      </Button>
    </>
  );
}
