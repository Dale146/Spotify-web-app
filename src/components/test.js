import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";

import Search from "./search";



const Test = () =>{
    // spotify API
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/";
    const RESPONSE_TYPE = "token"

    const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-email%20user-read-private%20user-follow-read`;


    // change state of accessToken, and token for each individual user
    const [accessToken, setAccessToken] = useState("");
    const [token,setToken] = useState("")



    
    const [userID, setUserID] = useState("")

    // run hook when user logs in
    useEffect(() => {
        const hash = window.location.hash;
        let storedToken = window.localStorage.getItem("token");
        // if local storage DO NOT have user token, run↓
        if (!storedToken && hash) {
            storedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", storedToken);
        }
        // give $token var
        setToken(storedToken);
        
        // if the user success logs in and the server gets the token, run function fetchUserData
        if (storedToken) {
            fetchUserData(storedToken); 
        }
    }, []);
    
    // get user playlist
    async function fetchUserData(token) {
        const userParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        // get user's playlist
        try {
            const playlist = await fetch('https://api.spotify.com/v1/me/playlists', userParameters);
            const userPlaylists = await playlist.json()
            console.log(userPlaylists)
            if (!playlist.ok) {
                throw new Error('Failed to fetch user playlist');
            }

        } catch (error) {
            console.error('Error fetching user playlist:', error);
        }
        // get user followed artists
        try {
            const followedArtists = await fetch("https://api.spotify.com/v1/me/following?type=artist",userParameters);
            const userFollowedArtists = await followedArtists.json()
            console.log(userFollowedArtists)
            if (!followedArtists.ok) {
                throw new Error('Failed to fetch user artists');
            }

        } catch (error) {
            console.error('Error fetching user artists:', error);
        }
        
    }
    
    
    // clear token and local storage token when logout
    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    

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
        <contextAccessToken.Provider value={{ accessToken: String(accessToken) }}>
            <contextUserToken.Provider value={{ token }}>

                {!token ?
                <a href={AUTH_ENDPOINT} >Login</a>:
                <button onClick={logout}>logout</button>}
                <Search/>
                
           </contextUserToken.Provider>
        </contextAccessToken.Provider>
    )
}

export default Test;