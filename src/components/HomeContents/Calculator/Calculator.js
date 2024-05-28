import React, { useState } from "react";
import NumDisplay from "./NumDisplay";
import OpDisplay from "./OpDisplay";

export default function Calculator(props) {
  const [n1, setN1] = useState("");
  const [curr, setCurr] = useState("");
  const [reset, setReset] = useState(false);
  const [op, setOp] = useState("");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <div
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            height: "32px",
            textAlign: "right",
            paddingRight: "16px",
          }}
        >
          {n1 && op && (
            <>
              {n1} {op}
            </>
          )}
        </div>
        <div
          style={{
            paddingTop: "16px",
            paddingBottom: "16px",
            height: "64px",
            textAlign: "right",
            paddingRight: "16px",
          }}
        >
          {" "}
          <h3>{curr}</h3>
        </div>
        <NumDisplay setCurr={setCurr} reset={reset} setReset={setReset} />
        <OpDisplay
          setOp={setOp}
          curr={curr}
          setN1={setN1}
          setReset={setReset}
          op={op}
          n1={n1}
          setCurr={setCurr}
        />
      </div>
    </div>
  );
}
