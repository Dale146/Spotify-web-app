import React from "react";
import { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";



const SingleAlbum = () =>{
    // spotify API
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/Home";
    const RESPONSE_TYPE = "token"

    const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-email%20user-read-private%20user-follow-read`;


    // change state of accessToken, and token for each individual user
    const [accessToken, setAccessToken] = useState("");
    const [token,setToken] = useState("")
    const [Album, setAlbum] = useState({});


    
    const [userID, setUserID] = useState("")

   const params = useParams();
   const id = params.id;
   const [albumData, setAlbumData] = useState('');
   const navigate = useNavigate()

   


    

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

    useEffect(() => {
        if (accessToken) {
            fetchAlbumData();
            fetchAlbum()

        }
    }, [accessToken,id]);

    async function fetchAlbum() {
        try {
            const userParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken 
                }
            };
            const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, userParameters);
            if (!response.ok) {
                throw new Error('Failed to fetch album');
            }
            const data = await response.json();
            setAlbum(data);
        } catch (error) {
            console.error('Error fetching album:', error);
        }
    }


    async function fetchAlbumData() {
        try {
            const userParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken 
                }
            };
            const response = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, userParameters);
            if (!response.ok) {
                throw new Error('Failed to fetch album');
            }
            const data = await response.json();
            setAlbumData(data);
        } catch (error) {
            console.error('Error fetching album data:', error);
        }
    }
    
    const albumTracks = albumData.items || [];



    

    
    return (
            <>
                <Header/>
                <main>
                    <section className="return" onClick={() => {
                        navigate('/pages/Home')
                    }}>
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"/></svg>
                    </section>
                <div className="profile-background">
                {albumData && (
                    <div className="single-album-container">
                        <div className="info-container album-info-container">
                         <div className="profile-details">
                                    {Album.images && Album.images.length > 0 && (
                                    <img src={Album.images[1].url} alt="user picture"/>
                                    )}
                                <section className="info-details">

                                    <h2>{Album.name}</h2>
                                    <p>{Album.type}</p>
                                    <p>{Album.release_date}</p>
                                    {Album.followers && Album.followers.total && (
                                        <p>followers:{Album.followers.total}</p>
                                    )}
                                </section>
                                
                                
                            </div>
                            </div>
                        <div className="top-tracks-container album-tracks-container">
                            <h2>Tracks</h2>
                            
                            <div className="tracks-container">

                                    {albumTracks.map((track,index) => (
                                        <div key={index} className="track hover-container">

                                            <section className="track-details">
                                                <h3>{track.name}</h3>
                                                <p>{track.artists[0].name}</p>
                                            </section>
                                            <a className="link" href={track.uri}></a>
                                        </div>
                    
                                    ))}
                                    

                            

                            
                            </div>
                            


                        </div>
                    </div>
                    )}
                    
                </div>
                </main>
            </>
    )
}

export default SingleAlbum;