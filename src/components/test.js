import React from "react";
import { useState, useEffect } from "react";



const Test = () =>{
    // spotify API
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    // change state of accessToken, and token for each individual user
    const [accessToken, setAccessToken] = useState("");
    const [token,setToken] = useState("")


    const [albums,setAlbums] = useState([])
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
    
        try {
            const playlist = await fetch('https://api.spotify.com/v1/me/playlists', userParameters);
            const userPlaylists = await playlist.json()
            console.log(userPlaylists)
            if (!playlist.ok) {
                throw new Error('Failed to fetch user data');
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
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

    // search for artists
    async function search() {
        const artistParameters = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + accessToken
            }
        }
        // get the artist individual ID
        const artistID = await fetch('https://api.spotify.com/v1/search?q=yoasobi&type=artist',artistParameters)
        .then(response => response.json())
        .then(data => {return data.artists.items[0].id})
        
        // get the albums by individual ID
        const albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=JP&limit=50',artistParameters)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAlbums(data.items);
        })


        
    }
    





    
    return (
        <>
        {!token ?
         <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} >Login</a>:
         <button onClick={logout}>logout</button>}
        <h1 onClick={search}>test</h1>
        
        </>
    )
}

export default Test;