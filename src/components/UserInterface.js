import React from "react";
import { useState, useEffect,useContext } from "react";
import { contextAccessToken,contextUserToken } from "../context";
import useAuth from "./useAuth";
import TopArtists from "./TopArtsts";
import TopTracks from "./TopTracks";
import Recommend from "./Recommend";

const UserProfile = () => {
    const {token} = useAuth();

    const [userProfile,setUserProfile] = useState({})

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
            const profile = await fetch('https://api.spotify.com/v1/me', userParameters);
            const userProfiles = await profile.json()
            setUserProfile(userProfiles)
            
            
            if (!profile.ok) {
                throw new Error('Failed to fetch user profile');
            }

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
        const userProfileInfo = userProfile || {};
        

            return (
                <div className="profile-container">
                    <div className="profile-background">
                        {userProfile && (
                            <div className="info-container">
                                {token ?(
                                <div className="profile-details">
                                    {userProfileInfo.images && userProfileInfo.images.length > 0 && (
                                    <img src={userProfileInfo.images[1].url} alt="user picture"/>
                                    )}
                                <section className="info-details">

                                    <h2>{userProfileInfo.display_name}</h2>
                                    <p>{userProfileInfo.email}</p>
                                    {userProfileInfo.followers && userProfileInfo.followers.total && (
                                        <p>followers:{userProfileInfo.followers.total}</p>
                                    )}
                                </section>
                                
                                
                            </div>
                                ) : (
                                    <div className="profile-details">
                                        
                                    </div>
                                )}

                            </div>
                        )}
                        <TopArtists/>
                        <TopTracks/>
                    </div>
                </div>
            )
}

export default UserProfile;