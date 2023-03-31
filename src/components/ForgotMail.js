import React, { useState } from 'react'
import Fcss from '../Stylesheets/Fcss.module.css'
import SighiinCss from "../Stylesheets/Sighi.module.css"

import {asyncMailer} from '../store/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Forgot = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("")

    const mailtaker = (e) => {
        e.preventDefault();
        dispatch(asyncMailer({
            email: email,
        }))
        navigate("/")
    }

    return (
        <div className={Fcss.main}>
            <div className={SighiinCss.reg}>
                <form className={SighiinCss.formU} onSubmit={mailtaker}>
                    <h1 className={SighiinCss.hO}>Registered Email !</h1>
                    <input type="email" name='email' required placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <input className={SighiinCss.submit} type="submit" name='submit' required value="CONFIRM" />
                </form>
            </div>
        </div>
    )
}

export default Forgot