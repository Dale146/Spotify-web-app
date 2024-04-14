import React from 'react';
import useAuth from './useAuth';
import homeIcon from "../images/Home.svg";
import userIcon from "../images/User.svg"
import searchIcon from "../images/seach-btn.svg";



function Footer(props) {
    const handleIconClick = (content) => {
        props.setDisplayContent(content);
    }

    return (
        <footer>
            <div className='footer-container'>
                <img src={homeIcon} alt='home icon' onClick={() => handleIconClick("default")}/>
                <img src={searchIcon} alt='searchIcon' onClick={() => handleIconClick("search")}/>
                <img src={userIcon} alt='user icon' onClick={() => handleIconClick("profile")}/>
            </div>
        </footer>
    )
}

export default Footer;