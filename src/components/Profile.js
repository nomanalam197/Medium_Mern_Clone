import React from 'react'
import Navbartwo from './Navbartwo'
import ProfileCss from "../Stylesheets/Profile.module.css"

import { useDispatch, useSelector } from "react-redux";
const Profile = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user)
  return (
    <> <Navbartwo/>
    <div className={ProfileCss.profile}>
      
        <div className={ProfileCss.profileLeft}>
            <h1> {user.user.name} </h1>
            <a className={ProfileCss.Home} href="">Home</a>
            <a href="">About</a>
            <hr />
            <div className={ProfileCss.profilelist}>
                <h3>Reading List</h3>
                <p>4 stories</p>
            </div>
        </div>
        <div className={ProfileCss.profileright}>
            <div className={ProfileCss.profileBtn}>Get Unlimited access</div>
            <div className={ProfileCss.profileprofile}></div>
            <h3> {user.user.name} </h3>
            <a href="">Edit profile</a>
        </div>

    </div>
    </>
  )
}

export default Profile