import {loaduser, loadblogs, errors, signout} from './userSlice';
import axios from '../axios';

// Note: we are able to call routes directly from here like this /signup because we had imported the axios 
// where we had already defined the baseurl and here only we had make usercredentials true their 
// and from with help of cors in backend we had send the Credentials in axios and made the frontend route 
// known to backend


export const asyncsignup = (newuser)=> async (dispatch, getstore)=>{
    try{
        // console.log(newuser);
        const {data} = await axios.post("/signup", newuser);
        // await axios.post("/signup", newuser);
        // console.log("signup action>>>>",data);
        dispatch(loaduser(data.user));

        // asyncloaduser();
    }catch(err){
        console.log(err.response)
        // console.log(err.response.data.message)
        dispatch(errors(err.response.data.message))
    }


    // dispatch(signin);
};

export const asyncsignin = (loggingInUser)=> async (dispatch, getstore)=>{
    try{
        // console.log(newuser);
        const {data} = await axios.post("/signin", loggingInUser);
        console.log("signin action>>>>",data);
        dispatch(loaduser(data.user));

        // asyncloaduser();
    }catch(err){
        console.log({error: err.response, Destination: "asyncsignin errors"} )
        // console.log(err.response.data.message)
        dispatch(errors(err.response.data.message))
    }
};

export const asyncsignout = ()=> async (dispatch)=>{
    try{
        const {data} = await axios.get("/signout");
        console.log(data)
        dispatch(signout());

        // asyncloaduser();
    }catch(err){
        console.log({error: err.response, Destination: "asyncsignout errors"} )
        // console.log(err.response.data.message)
        dispatch(errors(err.response.data.message))
    }
};

export const asyncloaduser = (newuser)=> async (dispatch)=>{
    
    try{
        const {data} = await axios.get("/loaduser")
        // console.log("loaduser action>>>>",data);
        dispatch(loaduser(data.user));

    }catch(err){
        console.log(err.response)
        dispatch(errors(err.response.data.message))
    }
}

// it is made to load blogs whenever this method is called -- we are using it to refresh the blogs database with it
// in application 
export const asyncloadblogs = ()=> async (dispatch)=>{
    try{
        const { data } = await axios.get('/blogs')
        // console.log(data);

        dispatch(loadblogs(data.blogs));
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asynccreateblog = (blog) => async (dispatch) => {
    try{    
        axios.post("/create-stories",blog);
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asyncSaveUnsave = (id)=> async (dispatch) =>{
    try{
        // console.log(id.id)
        const {data} = await axios.get(`/list/${id.id}`);
        console.log(data);
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asyncforget = (data, id)=> async (dispatch) =>{
    try{
        // console.log(data)
        // console.log(id)
        const { responseOutput } = axios.post(`/forget-password/${id}`,data);
        console.log( responseOutput );
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asyncChangePassword = (data, id)=> async (dispatch) =>{
    try{
        console.log(data)
        console.log(id)
        const { responseOutput } = axios.post(`/change_password/${id}`,data);
        console.log( responseOutput );
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asyncMailer = (mailaddress)=> async (dispatch) =>{
    try{
        console.log(mailaddress)
        const {data} = axios.post("/send-mail",mailaddress);
        console.log(data);
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}

export const asyncDelete = (id)=> async (dispatch) =>{
    try{
        // console.log(id.id)
        const {data} = axios.get(`/delete/:${id.id}`);
        console.log(data);
    }catch(err){
        dispatch(errors(err.response.data.message));
    }
}