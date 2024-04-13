import React from 'react';
import useAuth from './useAuth';
import homeIcon from "../images/Home.svg";
import userIcon from "../images/User.svg"
import searchIcon from "../images/seach-btn.svg";

function Footer() {


    return (
        <footer>
            <div className='footer-container'>
                <img src={homeIcon} alt='home icon' />
                <img src={searchIcon} alt='searchIcon' />
                <img src={userIcon} alt='user icon' />
            </div>
        </footer>
    )
}

export default Footer;