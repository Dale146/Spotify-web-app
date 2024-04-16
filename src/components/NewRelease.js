import React, { useState, useEffect, useContext } from "react";
import { contextAccessToken } from "../context";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const NewRelease = () => {
    const { accessToken } = useContext(contextAccessToken);
    const [newReleaseAlbums, setNewReleaseAlbums] = useState({});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (accessToken) {
            fetchUserData();
        }
    }, [accessToken]);

    async function fetchUserData() {
        try {
            const userParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            };
            const response = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=5', userParameters);
            if (!response.ok) {
                throw new Error('Failed to fetch new albums');
            }
            const data = await response.json();
            setNewReleaseAlbums(data);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching new albums:', error);
        }
    }

    const ReleaseAlbums = newReleaseAlbums.albums ? newReleaseAlbums.albums.items || [] : [];
    const navigate = useNavigate();

    return (
        <div className="yourPlaylist last">
            <div className="playlist-container">
                <section className="title-container">
                    <h2>New Release Albums</h2>
                </section>
                {loading ? ( 
                    <p>Loading...</p>
                ) : (
                    <>
                        {ReleaseAlbums && ReleaseAlbums.length > 0 ? (
                            <section className="album-container">
                                {ReleaseAlbums.map((album, index) => (
                                    <div className="album" key={album.id} onClick={() => {
                                        navigate(`/album/${album.id}`)
                                    }}>
                                        <img src={album.images[0].url} alt={album.name} />
                                        <h5>{album.name}</h5>
                                        <span>tracks : {album.total_tracks}</span>
                                    </div>
                                ))}
                            </section>
                        ) : (
                            <section className="album-container">
                                <p>No new albums available.</p>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default NewRelease;
