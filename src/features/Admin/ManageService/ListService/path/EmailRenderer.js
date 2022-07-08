import { Phone, Calendar } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./customizeListPT.scss";

const EmailRenderer = (props) => {
  return (
    <>
      <div className="phoneContainer">
        <div className="phoneText">
          {props.data.WorkDuration} &nbsp; {"month"}
        </div>
        <Calendar size={22} color="#000" weight="bold" />
      </div>
    </>
  );
};
export default EmailRenderer;
