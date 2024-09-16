import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JSNotes from "./JSNotes";
import ReactNotes from "./ReactNotes";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CSSNotes from "./CSSNotes";
import GitNotes from './GitNotes';
import InterviewNotes from './InterviewNotes';

const useStyles = makeStyles(() => ({
  listItem: {
    display: "flex",
    gap: "5px",
  },
}));

export default function Notes(props) {
  const classes = useStyles(props);
  const [js, setJS] = useState(false);
  const [react, setReact] = useState(false);
  const [css, setCSS] = useState(false);
  const [git, setGit] = useState(false);
  const [interview, setInterview] = useState(false);

  return (
    <>
      <>
        <div className={classes.listItem}>
          <b>JavaScript :</b>
          <div onClick={() => setJS((val) => !val)}>
            {js ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {js && <JSNotes />}
        <div className={classes.listItem}>
          <b>React:</b>
          <div onClick={() => setReact((val) => !val)}>
            {react ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {react && <ReactNotes />}
        <div className={classes.listItem}>
          <b>CSS:</b>
          <div onClick={() => setCSS((val) => !val)}>
            {css ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {css && <CSSNotes />}
        <div className={classes.listItem}>
          <b>Git:</b>
          <div onClick={() => setGit((val) => !val)}>
            {git ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {git && <GitNotes />}
        <div className={classes.listItem}>
          <b>Resume, Interview etc:</b>
          <div onClick={() => setInterview((val) => !val)}>
            {interview ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        </div>
        {interview && <InterviewNotes />}
        <br />
        <b>CORS:</b> <br />
        Cross origin resource sharing, This is a mechanism which uses additional
        http headers to tell the browser whether a specific web app can share
        resource with another web app and both apps must have different origins.
        Apps from same origin can share resource but apps from different origin
        need to go through this CORS mechanism. By origin we mean different
        domain, like browsers didnt allow resource sharing b/w diff domains
        earlier. These things were not allowed: https://efg.in is trying to
        access <br />
        1. Different domain: adc.com/api/getData <br />
        2. its subdomains: api.efg.in <br />
        3. Different ports: efg.in:5000 <br />
        4. Different protocol (http here, above https): http://efg.in <br />
        Resource sharing is needed in current scale of applications, so CORS
        became a standard and we can share resources. <br />
        Working: <br />
        Lets say origin1: A is requesting something from origin2: B. First a
        preflight request is made before actual api call is made. Browser first
        makes this call (also called OPTIONS call), A will make this call and B
        will validate the call. If valid, B responds back to A with additonal
        headers so A knows it is safe and then the actual API call is made.{" "}
        <br />
        One of the common header is: Access-Control-Allow-Origin which can have
        value: * meaning any domain can access this (public apis). we can also
        set it to a specific domain and only requests from that domain will be
        validate in preflight. Another header: Access-Control-Allow-Methods,
        allows only certain methods like GET, POST etc. Not all requests made by
        A go through this, simple requests (which browser automatically tags)
        does not make a preflight call, some criterias are followed to determine
        this classfication of the calls. <br />
        Saying it as error is bit incorrect, as it is a web standard/mechanism
        to make web secure. To fix this using browser extensions is not a good
        practice, we should handle it from our server.
        <br />
      </>
    </>
  );
}
