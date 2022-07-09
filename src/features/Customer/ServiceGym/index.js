import React from "react";
import "./Service.scss"
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";
import SearchService from "./SearchService/SearchService";
import ListService from "./ListService/ListService";
import HomeFooter from "../../../pages/HomePage/HomeFooter";
import "../../../pages/HomePage/HomePage.scss"

const ServiceGym = () => {
  return (
    <div className="ServiceProfileBg">
      <div className="containerServiceList">
        <div className="backToHome">
          <NavLink to="/" className="backToHomeLink">
            <ArrowLeft size={24} color="#ffffff" weight="duotone" />
            <div className="textBackToHome">Back to home</div>
          </NavLink>
          <div>
            <SearchService />
          </div>
        </div>

        <div className="listItem">
          <ListService /> <HomeFooter />

        </div>

      </div>

    </div>
  );
};
export default ServiceGym;
