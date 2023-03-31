import React from 'react'
import logo from "../assets/mediumO.png"
import { Link } from 'react-router-dom'
import NavCss from '../Stylesheets/Navi.module.css'

const boxn = {
  color: "white",
  margin: "0"
};

const Navbar = () => {
  return (
    <nav>
      <div className={NavCss.onen}>
        <img src={logo} alt="" />
      </div>
      <div className={NavCss.twon}>
        <div className={NavCss.contentn}>
          <Link className= {`${NavCss.connection} ${NavCss.noneF}`}  to="/">Our Story</Link>
          <Link className= {`${NavCss.connection} ${NavCss.noneF}`}  to="/">Membership</Link>
          <Link className= {`${NavCss.connection} ${NavCss.noneF}`}  to="/">Write</Link>
          <Link className= {`${NavCss.connection} ${NavCss.noneF}`}  to="/signin">Sign In</Link>
          <div className={NavCss.started}>
            <Link className={NavCss.connection} style={boxn} to="/signin">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar