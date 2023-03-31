// import axios from "axios";



// const instance = axios.create({baseURL: "http://localhost:3030/", withCredentials: true});
// export default instance;



import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

export default instance;
