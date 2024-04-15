import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";
import useAuth from "./useAuth";

const Recommend = ({topGenres}) => {
    const {token} = useAuth();

    const [userProfile,setUserProfile] = useState({})
    const [reload, setReload] = useState(false);

    
    
    useEffect(() => {
        if(token && topGenres && topGenres.length > 0) {
            fetchUserData(token)
        }
    },[token,topGenres,reload])

    async function fetchUserData(token) {
        if (!topGenres || topGenres.length === 0){
            return;
        }
        const genresString = topGenres.join("%2C");
        const userParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        // get user's profile
        try {
            const profile = await fetch(`https://api.spotify.com/v1/recommendations?limit=5&seed_genres=${genresString}`, userParameters);
            const userRecommendation = await profile.json()
            setUserProfile(userRecommendation)
            

            
            if (!profile.ok) {
                throw new Error('Failed to fetch user profile');
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
        const userRecommend = userProfile.tracks || [];
        

        const handleReload = () => {
            setReload(!reload);
        }
        
        
        
            return (
                <>
                    {userProfile && (
                        <div className="reccomend-container">
                            <h2>Recommended Tracks</h2>
                            <button onClick={handleReload}>Reload</button>
                            {token ?(
                            <div className="tracks-container">
                                {userRecommend && userRecommend.length > 0 ? (
                                    userRecommend.map((track,index) => (
                                        <div key={index} className="track hover-container">
                                            
                                            <img src={track.album.images[0].url} alt={"picture of " + track.name} />
                                            <section className="track-details">
                                                <h3>{track.name}</h3>
                                                <p>{track.artists[0].name}</p>
                                            </section>
                                            <a className="link" href={track.uri}></a>
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

export default Recommend;