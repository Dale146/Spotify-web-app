import React from "react";
import { useState,useEffect,useContext } from "react";
import {  contextAccessToken,contextUserToken } from "../context";
import searchIcon from "../images/search.svg";
const Search = () => {
    const [albums,setAlbums] = useState([])
    const {accessToken} = useContext(contextAccessToken)
    const {userToken} = useContext(contextUserToken)

    const [searchKey,setSearchKey] = useState("")
    const [errorMSG, setErrorMSG] = useState("");
    // search for artists
   
    async function search(event) {
        event.preventDefault();

        if(!searchKey.trim()){
            setErrorMSG("Please enter a valid artist")
            return;
        }

        const artistParameters = {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + accessToken
            }
        }
        // get the artist individual ID
        const artistID = await fetch('https://api.spotify.com/v1/search?q='+ searchKey +'&type=artist',artistParameters)
        .then(response => response.json())
        .then(data => {return data.artists.items[0].id})
        
        // get artist albums by artist individual ID
        const albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=JP&limit=50',artistParameters)
        .then(response => response.json())
        .then(data => {
            
            setAlbums(data.items);
        })
        
        
        
    }
    const artistAlbumsInfo = albums || [];
    console.log(artistAlbumsInfo)


    return (
        <div className="search-page">
         
         <form onSubmit={search}>
            <input type="text" onKeyDown={event => {
                if(event.key == "Enter"){
                    search(event)
                }
            }}
            onChange={event => setSearchKey(event.target.value)}
            value={searchKey}/>
            <button className="search-btn" type="submit"><img src={searchIcon} alt="search icon" /></button>
         </form>
         
         <div className="result-container">
            {artistAlbumsInfo && artistAlbumsInfo.length > 0 ? (
                <div>
                    {artistAlbumsInfo.map((playlist, index) => {
                        return (
                            <div className="album" key={playlist.id}>
                            <img src={playlist.images[0].url} alt={playlist.name} />
                            <div className="album-details">
                            <h5>{playlist.name}</h5>
                            <span>tracks : {playlist.total_tracks}</span>
                            <span>Release Date:<br/>{playlist.release_date}</span>
                            {playlist.artists.map((artist, artistIndex) => (
                                <a key={artistIndex} href={artist.uri}>{artist.name}</a>
                            ))}
                            </div>
                            </div>
                            
                        )
                    })}
                </div>


            ) : (
                <p>{errorMSG}</p>
            )}
         </div>
         
        </div>
    )
}
export default Search;