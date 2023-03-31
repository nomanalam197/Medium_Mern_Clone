import React, { useState, useEffect } from 'react'
import SighiinCss from "../Stylesheets/Sighi.module.css"
import close from '../assets/close-line.png'
import google from '../assets/google-fill.png'
import facebook from '../assets/facebook-box-fill.png'
import apple from '../assets/apple-fill.png'
import twitter from '../assets/twitter-fill.png'
import emailL from '../assets/mail-line.png';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import { asyncsignup, asyncsignin } from "../store/userActions";
import { useNavigate, Outlet } from "react-router-dom";

const Sighin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user);

    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [about, setAbout] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailL, setEmailL] = useState("")
    const [passwordL, setPasswordL] = useState("")

    const register = (e) => {
        e.preventDefault();

        dispatch(asyncsignup({
            name: fullname,
            username: username,
            bio: bio,
            about: about,
            email: email,
            password: password
        }))
    }

    const signinuser = (e) => {
        e.preventDefault();
        dispatch(asyncsignin({
            email: emailL,
            password: passwordL

        }))
    }



    useEffect(() => {
        isAuthenticated && navigate("/home");
    }, [isAuthenticated]);

    return (
        <div className={SighiinCss.main}>
            <div className={SighiinCss.logreg}>
                <div className={SighiinCss.log}>
                    <form className={SighiinCss.formU} onSubmit={register}>
                        <h1 className={SighiinCss.hOne}>Become A Blogger</h1>
                        <input type="text" name='name' required placeholder='Full Name' onChange={(e) => { setFullname(e.target.value) }} value={fullname} />
                        <input type="text" name='username' required placeholder='Username' onChange={(e) => { setUsername(e.target.value) }} value={username} />
                        <input type="text" name='bio' required placeholder='Bio' onChange={(e) => { setBio(e.target.value) }} value={bio} />
                        <input type="text" name='about' required placeholder='About' onChange={(e) => { setAbout(e.target.value) }} value={about} />
                        <input type="email" name='email' required placeholder='Email Address' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input type="password" name='password' required placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <input type="submit" name='submit' required value="Register" />
                    </form>
                </div>
                <div className={SighiinCss.reg}>
                    <form className={SighiinCss.formU} onSubmit={signinuser}>
                        <h1 className={SighiinCss.hO}>Log In Blogger</h1>
                        <input type="email" name='emailL' required placeholder='Email Address' onChange={(e) => { setEmailL(e.target.value); }} value={emailL} />
                        <input type="password" name='passwordL' required placeholder='Password' onChange={(e) => { setPasswordL(e.target.value); }} value={passwordL} />
                        <input className={SighiinCss.submit} type="submit" name='submit' required value="Log In" />
                        <Link style={{ textDecoration: 'none', color: "red" }} to="/forgotEmail">Forgot password ?</Link>
                    </form>
                </div>
            </div>
            <div className={SighiinCss.contents}>
                <div className={SighiinCss.one}>
                    <div className={SighiinCss.cross}>
                        <img src={close} alt="" />
                    </div>
                    <div className={SighiinCss.welcome}>
                        <h3>WELCOME BACK</h3>
                    </div>
                </div>
                <div className={SighiinCss.two}>
                    <div className={SighiinCss.box}>
                        <div className={SighiinCss.contentlogo}>
                            <img src={google} alt="" /> <p>Sign in with Google.</p>
                        </div>
                    </div>
                    <div className={SighiinCss.box}>
                        <div className={SighiinCss.contentlogo}>
                            <img src={facebook} alt="" /> <p>Sign in with Facebook.</p>
                        </div>
                    </div>
                    <div className={SighiinCss.box}>
                        <div className={SighiinCss.contentlogo}>
                            <img src={apple} alt="" /> <p>Sign in with Apple.</p>
                        </div>
                    </div>
                    <div className={SighiinCss.box}>
                        <div className={SighiinCss.contentlogo}>
                            <img src={twitter} alt="" /> <p>Sign in with Twitter.</p>
                        </div>
                    </div>
                    <div className={SighiinCss.box}>
                        <div className={SighiinCss.contentlogo}>
                            <img src={emailL} alt="" /> <p>Sign in with Email.</p>
                        </div>
                    </div>
                    <h6>No account? <span>Create one</span></h6>
                </div>
                <div className={SighiinCss.three}>
                    <p>Forgot email or trouble signing in? <u> Get help.</u></p>
                    <p>Click “Sign In” to agree to Medium’s <u>Terms of Service</u> and acknowledge that <br /> Medium’s <u>Privacy Policy</u> applies to you.</p>
                </div>
            </div>
        </div>
    )
}

export default Sighin