import React, {useState}from 'react'
import Fcss from '../Stylesheets/Fcss.module.css'
import SighiinCss from "../Stylesheets/Sighi.module.css"

import { Link, useNavigate, useParams } from 'react-router-dom'
import { asyncChangePassword } from '../store/userActions'
import { useDispatch, useSelector } from "react-redux";
const Change = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [newpassword, setnewpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");

    const { id } = useParams();
    const passwordtaker = (e) => {
        e.preventDefault();
        dispatch(asyncChangePassword({
            newpassword: newpassword,
            confirmpassword: confirmpassword
        }, id))
        navigate("/settings")
    }
    return (
        <div className={Fcss.main}>
            <div className={SighiinCss.reg}>
                <form className={SighiinCss.formU} onSubmit={passwordtaker}>
                    <h1 className={SighiinCss.hO}>Change Password !</h1>
                    <input type="password" name='newpassword' required placeholder='New Password' onChange={(e) => { setnewpassword(e.target.value) }} value={newpassword}/>
                    <input type="password" name='confirmpassword' required placeholder='Confirm Password' onChange={(e) => { setconfirmpassword(e.target.value) }} value={confirmpassword}/>
                    <input className={SighiinCss.submit} type="submit" name='submit' required value="CONFIRM" />
                </form>
            </div>
        </div>
    )
}

export default Change