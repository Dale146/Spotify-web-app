import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../components/useAuth";
const Splash = () => {
    
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
        const REDIRECT_URI = "http://localhost:3000/my-app/pages/Home";
        const RESPONSE_TYPE = "token"
    
        const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-email%20user-read-private%20user-follow-read%20user-top-read`;
    
        const {token} = useAuth();
    

    
    
    
  
    return(
        <>
        
        

        <a href={AUTH_ENDPOINT}>Login</a>
        <Link to="/pages/Home">Home</Link>
         

        </>
    )
}
export default Splash;