import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const SinglePlaylist = () =>{
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/Home";
    const RESPONSE_TYPE = "token";

    const [accessToken, setAccessToken] = useState("");
    const [playlistData, setPlaylistData] = useState('');
    const [thisPlaylistData, setThisPlaylistData] = useState('');
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };

        fetch('https://accounts.spotify.com/api/token',authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token));
    },[]);

    useEffect(() => {
        if (accessToken) {
            fetchPlaylistData();
        }
    }, [accessToken, id]);

    async function fetchPlaylistData() {
        try {
            const userParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken 
                }
            };

            const [playlistResponse, selectedPlaylistResponse] = await Promise.all([
                fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, userParameters),
                fetch(`https://api.spotify.com/v1/playlists/${id}`, userParameters)
            ]);

            if (!playlistResponse.ok || !selectedPlaylistResponse.ok) {
                throw new Error('Failed to fetch playlist');
            }

            const [playlistData, selectedPlaylistData] = await Promise.all([
                playlistResponse.json(),
                selectedPlaylistResponse.json()
            ]);

            setPlaylistData(playlistData);
            setThisPlaylistData(selectedPlaylistData);
        } catch (error) {
            console.error('Error fetching playlist data:', error);
        }
    }
    
    const playlistTracks = playlistData.items || [];
    
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
                    {playlistData && (
                        <div className="single-album-container">
                            <div className="info-container album-info-container">
                                <div className="profile-details singlePlaylist">
                                    {playlistTracks[0]?.track?.album?.images && playlistTracks[0]?.track?.album?.images.length > 0 && (
                                        <img src={playlistTracks[0].track.album.images[1].url} alt="album"/>
                                    )}
                                    <section className="info-details">
                                        <h2>{thisPlaylistData.name}</h2>
                                        <p>{thisPlaylistData.type}</p>
                                        <p>{thisPlaylistData.release_date}</p>
                                        {thisPlaylistData.followers && thisPlaylistData.followers.total && (
                                            <p>followers:{thisPlaylistData.followers.total}</p>
                                        )}
                                    </section>
                                </div>
                            </div>
                            <div className="top-tracks-container album-tracks-container">
                                <h2>Tracks</h2>
                                <div className="tracks-container">
                                    {playlistTracks.map((singleTrack, index) => (
                                        <div key={index} className="track hover-container">
                                            <section className="track-details">
                                                <h3>{singleTrack.track.name}</h3>
                                                <p>{singleTrack.track.artists[0].name}</p>
                                            </section>
                                            <a className="link" href={singleTrack.track.uri}></a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default SinglePlaylist;
