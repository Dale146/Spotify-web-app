import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";

import Search from "../components/search";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserPlaylist from "../components/userPlaylist";
import UserProfile from "../components/UserInterface";


const Home = () =>{
    // spotify API
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/home";
    const RESPONSE_TYPE = "token"

    const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-email%20user-read-private%20user-follow-read`;


    // change state of accessToken, and token for each individual user
    const [accessToken, setAccessToken] = useState("");
    const [token,setToken] = useState("")

    // change state of showing content
    const [displayContent, setDisplayContent] = useState("default")

    
    const [userID, setUserID] = useState("")

   


    

    useEffect(() => {
        //API access Token
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        fetch('https://accounts.spotify.com/api/token',authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
            
        
    },[])





    

    
    return (
        <contextAccessToken.Provider value={{ accessToken }}>
            <contextUserToken.Provider value={{ token }}>
                <Header/>
                <main>

                {displayContent === "default" && <UserPlaylist />}
                {displayContent === "search" && <Search />}
                {displayContent === "profile" && <UserProfile />}
                </main>

                <Footer setDisplayContent={setDisplayContent}/>
           </contextUserToken.Provider>
        </contextAccessToken.Provider>
    )
}

export default Home;