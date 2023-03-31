import React from "react";
import NavT from "../Stylesheets/Navitwo.module.css";
import logo from "../assets/7079377_medium_medium logo_icon.png";
import search from "../assets/search-line.png";
import { Link } from "react-router-dom";
import pages from "../assets/pages-line.png";
import bell from "../assets/notification-2-line.png";
import arrow from "../assets/arrow-drop-down-line.png";
import user from "../assets/user.png";
import bookmark from "../assets/bookmark-line.png";
import pagesB from "../assets/pages-line.png";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { asyncsignout } from "../store/userActions";
import { useNavigate, Outlet } from "react-router-dom";

const Navbartwo = () => {
  
  const displayS = "none";
  const [display, setdisplay] = useState("none");
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var boxChanger = () => {
    if(flag2){
    setdisplay("initial")
    setFlag2(!flag2)
    }else{
      setdisplay("none")
    setFlag2(!flag2)
    }
    
  };
  const clickHandler = ()=>{
    setFlag(!flag);
  }
  
  const signOutUser = ()=>{
    dispatch(asyncsignout())
    navigate("/signin")
  }
  return (
    <div>
      <nav className={NavT.navii}>
        <div className={NavT.rectangularBox} onClick={clickHandler} style={{ display: display }}>
          <div className={NavT.rectangleF}>
            <div className={NavT.pro}>
              <img className={NavT.bpng} src={user} alt="" /> <p><Link style={{textDecoration: 'none'}} to="/profile">Profile</Link></p>
            </div>
          </div>
          <div className={NavT.rectangleF}>
            <div className={NavT.pro}>
              <img className={NavT.bpng} src={bookmark} alt="" /> <p><Link style={{textDecoration: 'none'}} to="/lists">Lists</Link></p>
            </div>
          </div>
          <div className={NavT.rectangleF}>
            <div className={NavT.pro}>
              <img className={NavT.bpng} src={pagesB} alt="" /> <p><Link style={{textDecoration: 'none'}} to="/stories">Stories</Link></p>
            </div>
          </div>
          <div className={NavT.rectangleF}>
            <p><Link style={{textDecoration: 'none'}} to="/settings">Settings</Link></p>
          </div>
          <div className={NavT.rectangleF} style={{ border: "none" }}>
            <p onClick={signOutUser}>Sign out</p>
          </div>
        </div>
        <div className={NavT.onen}>
        <Link style={{textDecoration: 'none'}} to="/">
          <img className={NavT.logoM} src={logo} alt="" />
        </Link>
          <input className={NavT.in} type="text" placeholder="Search Medium" />
        </div>
        <div className={NavT.twon}>
          <div className={NavT.contentn}>
            <div className={NavT.W}>
              <img className={NavT.Wimg} src={pages} alt="" />{" "}
              <Link
                className={NavT.connection}
                style={{ marginLeft: "0.3vw" }}
                to="/write"
              >
                Write
              </Link>
            </div>
            <Link className={NavT.connection} to="/home">
              <img className={NavT.bell}
               src={bell} alt="" />
            </Link>
            <div className={NavT.CircleD}>
              <div className={NavT.started}></div>
              <img
                className={NavT.arrow}
                src={arrow}
                alt=""
                onClick={boxChanger}
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbartwo;
