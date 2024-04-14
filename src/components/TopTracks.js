import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";
import useAuth from "./useAuth";

const TopTracks = () => {
    const {token} = useAuth();

    const [userProfile,setUserProfile] = useState({})

    const [topGenres, setTopGenres] = useState([]);

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
        // get user's profile
        try {
            const profile = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', userParameters);
            const userTopTracks = await profile.json()
            setUserProfile(userTopTracks)
            

            
            if (!profile.ok) {
                throw new Error('Failed to fetch user profile');
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
        const userTopTracks = userProfile.items || [];
        

        


            return (
                <>
                    {userProfile && (
                        <div className="top-artist-container">
                            <h2>Your Top Tracks</h2>
                            {token ?(
                            <div className="tracks-container">
                                {userTopTracks && userTopTracks.length > 0 ? (
                                    userTopTracks.map((track,index) => (
                                        <div key={index} className="track">
                                            <img src={track.album.images[1].url} alt={"picture of " + track.name} />
                                            <section className="track-details">
                                                <h3>{track.name}</h3>
                                                <p>{track.artists[0].name}</p>
                                            </section>
                                            
                                        </div>
                                    ))
                                ) : (
                                    <div className="tracks-container">
                                    </div>
                                )
                            }

                            
                            </div>
                            // if the user is not logged in
                            ) : (
                                <div className="tracks-container">
                                    
                                </div>
                            )}

                        </div>
                    )}

                </>
            )
}

export default TopTracks;