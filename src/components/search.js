import React from "react";
import { useState,useEffect,useContext } from "react";
import {  contextAccessToken,contextUserToken } from "../context";

const Search = () => {
    const [albums,setAlbums] = useState([])
    const {accessToken} = useContext(contextAccessToken)
    const {userToken} = useContext(contextUserToken)

    const [searchKey,setSearchKey] = useState("")
    // search for artists
   
    async function search(event) {
        event.preventDefault();

        if(!searchKey.trim()){
            alert("enter artist name")
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
            console.log(data)
            setAlbums(data.items);
        })
        
        
        
    }
    

    return (
        <>
         
         <form onSubmit={search}>
            <input type="text" onKeyDown={event => {
                if(event.key == "Enter"){
                    search(event)
                }
            }}
            onChange={event => setSearchKey(event.target.value)}
            value={searchKey}/>
            <button type="submit">search</button>
         </form>
        </>
    )
}
export default Search;