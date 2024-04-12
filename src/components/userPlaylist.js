import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";
import useAuth from "./useAuth";

const UserPlaylist = () => {
    const {token} = useAuth();

    const [userFollowedPlaylists,setUserFollowedPlaylists] = useState({})

    useEffect(() => {
        if(token) {
            fetchUserData(token)
        }
    },[token])

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
            setUserFollowedPlaylists(userPlaylists)
            
            
            if (!playlist.ok) {
                throw new Error('Failed to fetch user playlist');
            }

        } catch (error) {
            console.error('Error fetching user playlist:', error);
        }
    }
        const userPlaylistInfo = userFollowedPlaylists.items || [];


            return (
                <>
                {userPlaylistInfo && userPlaylistInfo.length > 0 ? (
                    <div className="yourPlaylist">
                        <div className="playlist-container">
                            <section className="title-container">
                                <h2>Your Playlists</h2>
                            </section>
                            <section className="album-container">
                                {userPlaylistInfo.map((playlist, index) => {
                                    return ( 
                                        <div className="album" key={playlist.id}>
                                        <img src={playlist.images[0].url} alt={playlist.name} />
                                        <h5>{playlist.name}</h5>
                                        <span>tracks : {playlist.tracks.total}</span>
                                        
                                        </div>
                                    );
                                })}
                            </section>
                    </div>
                    </div>
                    
                
            ) : (
                <p>Loading...</p>
            )}
                </>
            )
}

export default UserPlaylist;