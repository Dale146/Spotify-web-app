import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";
import useAuth from "./useAuth";

const TopArtists = () => {
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
            const profile = await fetch('https://api.spotify.com/v1/me/top/artists?limit=3', userParameters);
            const userTopArtist = await profile.json()
            setUserProfile(userTopArtist)
            

            
            if (!profile.ok) {
                throw new Error('Failed to fetch user profile');
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
        const userTopArtists = userProfile.items || [];
        
        useEffect(() => {
            if (userTopArtists && userTopArtists.length > 0) {
                const genres = userTopArtists.map(artist => artist.genres[0]);
                setTopGenres(genres);
            }
        }, [userTopArtists]);
        
        console.log(userTopArtists)

            return (
                <>
                    {userProfile && (
                        <div className="top-artist-container">
                            <h2>Your Top Aritsts</h2>
                            {token ?(
                            <div className="artist-container">
                                {userTopArtists && userTopArtists.length > 0 ? (
                                    userTopArtists.map((artist,index) => (
                                        <div key={index} className="artist">
                                            <img src={artist.images[2].url} alt={"picture of " + artist.name} />
                                            <section className="artist-details">
                                                <h3>{artist.name}</h3>
                                                <p>Genres: <span>{artist.genres.join(", ")}</span></p>
                                                
                                            </section>
                                            
                                        </div>
                                    ))
                                ) : (
                                    <div className="artist-container">
                                    </div>
                                )
                            }

                            
                            </div>
                            // if the user is not logged in
                            ) : (
                                <div className="artist-container">
                                    
                                </div>
                            )}

                        </div>
                    )}

                </>
            )
}

export default TopArtists;