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
                    <div className="yourPlaylist">
                        <div className="playlist-container">
                            <section className="title-container">
                                <h2>Your Playlists</h2>
                            </section>
                                {userPlaylistInfo && userPlaylistInfo.length > 0 ? (
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
                                            <div className="album">
                                            <img className="test" src="" />
                                            <h5>my name</h5>
                                            <span>tracks : 24</span>
                                            
                                            </div>
                                            <div className="album">
                                            <img className="test" src="" />
                                            <h5>my name</h5>
                                            <span>tracks : 24</span>
                                            
                                            </div>
                                </section>

                    
                
            ) : (

                        <section className="album-container">
                            <p>you are not logged in or you do not have any playlist...</p>
                        </section>
            )}
                    </div>
                </div>
                
                </>
            )
}

export default UserPlaylist;