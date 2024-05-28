import React, { useState } from "react";
import Addimage from "./Addimage";
import Showimage from "./Showimage";
import ButtonMui from "./ButtonMui";
import axios from "axios";
import Loader from "./Loader";
import Showcapt from "./Showcapt";

export default function ImageCaption() {
  const [showimage, setShowimage] = useState(false);
  const [showcapt, setShowcapt] = useState(false);
  const [captbutton, setCaptbutton] = useState(false);
  const [load, setLoad] = useState(false);
  const [capt, setCapt] = useState("");
  const [img, setImg] = useState("");

  const disp = (e) => {
    setShowimage(true);
    setCaptbutton(true);
    setShowcapt(false);
    setImg(e.target.files[0]);
  };

  const apiCall = () => {
    setCaptbutton(false);
    setLoad(true);
    var bodyFormData = new FormData();
    bodyFormData.append("image", img);
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/predict",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setCapt(response);
        setLoad(false);
        setShowcapt(true);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <>
      <Addimage onChange={disp} />
      {showimage && <Showimage image={img} />}
      {captbutton && (
        <ButtonMui
          text={"Generate Caption!"}
          className={"btn btn-primary btn-lg"}
          onClick={apiCall}
        />
      )}
      {load && <Loader />}
      {showcapt && <Showcapt text={capt.data} />}
    </>
  );
}
