import React from 'react';
import useAuth from './useAuth';
import spotifyLogo from "../images/spotify.svg";

function Header() {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/home";
    const RESPONSE_TYPE = "token"

    const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-email%20user-read-private%20user-follow-read`;

    const {token, logout} = useAuth();

    return (
        <header>
            <a href='https://open.spotify.com/'><img src={spotifyLogo} alt='spotify logo'/></a>
            {token ? <button className='log' onClick={logout}>Logout</button> : <a className='log' href={AUTH_ENDPOINT}>Login</a>}
        </header>
    )
}

export default Header;