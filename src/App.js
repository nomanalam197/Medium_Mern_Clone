import axios from './axios';
import react, { useEffect, useState } from 'react';
//for redux
import { useDispatch, useSelector } from "react-redux";
import { asyncsignup, asyncloaduser, asyncsignin, asyncsignout, asyncloadblogs } from "./store/userActions";

import Editor from './components/Editor'; 
import { toast } from "react-toastify"; 
import parse from 'html-react-parser';

import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Sighin from "./components/Sighin"
import Navbartwo from "./components/Navbartwo"
import HomeLoggedIn from './components/HomeLoggedIn';
import Write from './components/Write';
import Profile from './components/Profile';
import Lists from './components/Lists';
import Stories from './components/Stories';
import Settings from './components/Settings';
import Forgot from './components/Forgot';
import Change from './components/Change';
import ForgotMail from './components/ForgotMail'

import ProtectedRoute from './ProtectedRoute'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user)

  const notify = () => toast("Wow so easy!");

  const allDataOfApplication = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(asyncloadblogs());
    dispatch(asyncloaduser());
  }, [])

  const registerUser = () => {
    dispatch(asyncsignup({
      name: "Ravi Kumar",
      username: 'ravi_kumar',
      email: 'ravi@kumar.com',
      password: 'Aa@123'
    }))
  }


  const signinuser = () => {
    dispatch(asyncsignin({
      email: 'nomanalam197@gmail.com',
      password: 'Noman@1234'

    }))
  }
  // arif10@gmail.com
  // Arif@123
  const signOutUser = () => {
    dispatch(asyncsignout())
  }


  return (
    <div>
      {/* <button onClick={notify}>Call Toast</button>
      <button onClick={registerUser}>Signup</button>
      <button onClick={signinuser}>Signin</button>
      <button onClick={signOutUser}>Sign Out</button> */}

      <hr />


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Sighin />} />
        <Route path='/forgotEmail' element={<ForgotMail />} />
        <Route path='/forget-password/:id' element={<Forgot />} />
        <Route path='/home' element={
          <ProtectedRoute>
            <HomeLoggedIn />
          </ProtectedRoute>
        } />
        <Route path='/write' element={
          <ProtectedRoute>
            <Write />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/lists' element={
          <ProtectedRoute>
            <Lists />
          </ProtectedRoute>
        } />
        <Route path='/stories' element={
          <ProtectedRoute>
            <Stories />
          </ProtectedRoute>
        } />
        <Route path='/settings' element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path='/change/:id' element={
          <ProtectedRoute>
            <Change />
          </ProtectedRoute>
        } />
      </Routes>


    </div>
  );
}

export default App;
