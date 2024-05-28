import React from "react";
import Home from "../components/HomeContents/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./../components/Navbar";
import ImageCaption from "./../components/ImageComponents/ImageCaption";

export default function Routes(props) {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/model" exact component={ImageCaption} />
    </Router>
  );
}
