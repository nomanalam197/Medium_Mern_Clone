import React from "react";
import logo from "../assets/7079377_medium_medium logo_icon.png";
import Navbartwo from './Navbartwo'
import Editor from './Editor';
const Write = () => {
  return (
    <div id="write">
       <Navbartwo/>
      <div id="writeNav">
        <div className="writeLogo">
          <img src={logo} alt="" srcset="" />
          <p>Draft</p>
        </div>
        <div className="writeRight">
            <div className="writePublish">Publish</div>
            <h1 style={{marginTop:"-20px"}}>...</h1>
            <div className="writeProfile"></div>
        </div>
      </div>

      <Editor />
    </div>
  );
};

export default Write;
