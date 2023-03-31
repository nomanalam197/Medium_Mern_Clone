import React from 'react'
import SettingsCss from "../Stylesheets/Settings.module.css"
import arrow from '../assets/arrow-right-up-line.svg'
import Navbartwo from './Navbartwo'
import { Link, useNavigate } from 'react-router-dom'

import HomeCss from "../Stylesheets/Style.module.css"
import { asyncDelete } from '../store/userActions'
import { useDispatch, useSelector } from "react-redux";
const Settings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const deleteClick = (id) => {
        console.log(id)
        dispatch(asyncDelete({ id: id }))
        navigate("/signin")
    }
    return (
        <><Navbartwo/>
        <div className={SettingsCss.main}>
             
            <div className={SettingsCss.left}>
                <div className={SettingsCss.leftL}>

                </div>
                <div className={SettingsCss.rightR}>
                    <div className={SettingsCss.heading}>
                        <h1>Settings</h1>
                    </div>
                    <div className={SettingsCss.rightRcontent}>
                        <div className={SettingsCss.bar}>
                            <p style={{ fontWeight: 700 }}>Account</p>
                            <p>Publishing</p>
                            <p>Notifications</p>
                            <p>Membership and Payment</p>
                            <p>Security and apps</p>
                        </div>
                        <div className={SettingsCss.barS}>

                            <div className={SettingsCss.barsB}>
                                <h5>Email Address</h5>
                                <p style={{ color: "gray" }}> {user.user.email} </p>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <h5>Username and subdomain</h5>
                                <p style={{ color: "gray" }}> {user.user.email} </p>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h5>Profile information</h5>
                                    <p style={{ color: "gray" }}>Edit your photos, name, bio, etc.</p>
                                </div>
                                <div className="barsBS" style={{ display: "flex" }}>
                                {user.user.username} <div className={SettingsCss.circle}></div>
                                </div>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h5>Profile design</h5>
                                    <p style={{ color: "gray" }}>Pick colors and fonts, style the header, and make your profile unique.</p>
                                </div>
                                <div className="barsBS" style={{ display: "flex" }}>
                                    <img style={{ margin: 8 }} src={arrow} alt="" />
                                </div>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h5>Custom domain</h5>
                                    <p style={{ color: "gray" }}>Upgrade to a Medium Membership to redirect your profile URL to a
                                        domain like yourdomain.com.</p>
                                </div>
                                <div className="barsBS" style={{ display: "flex" }}>
                                    None <img className={SettingsCss.imgB} src={arrow} alt="" />
                                </div>
                            </div>
                            <hr style={{ color: "gray" }} className={SettingsCss.hr} />
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h5>Muted writers and publications</h5>
                                </div>
                                <div className="barsBS" style={{ display: "flex" }}>
                                    <img className={SettingsCss.imgB} src={arrow} alt="" />
                                </div>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <h5>Blocked users</h5>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h3>
                                        <Link style={{textDecoration: 'none', color: "green", fontWeight: 600}} to= {`/change/${user.user._id}`} >Change password</Link>
                                    </h3>
                                </div>
                            </div>
                            <div className={SettingsCss.barsB}>
                                <div className="barsBF">
                                    <h3 style={{ color: "red", fontWeight: 400 }}>Deactivate account</h3>
                                    <p style={{ color: "gray" }}>Deactivating will suspend your account until you sign back in.</p>
                                </div>
                            </div>
                            <div className={SettingsCss.barsB}>
                            <div className="barsBF">
                                    <h3 style={{ color: "red", fontWeight: 400 }} onClick={() => deleteClick(`${user.user._id}`)}>Delete account</h3>
                                    <p style={{ color: "gray" }}>Permanently delete your account and all of your content.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={SettingsCss.right}>
                <div className={SettingsCss.headingR}>
                    <h3>Suggested help articles</h3>
                </div>
                <div className={SettingsCss.rightRRcontent}>
                    <p>Sign in or sign up to Medium</p>
                    <p>Your profile page</p>
                    <p>Writing and publishing your first story</p>
                    <p>About Medium's distribution system</p>
                    <p>Get started with the Partner Program</p>
                </div>
            </div>
        </div >
        </>
    )
}

export default Settings