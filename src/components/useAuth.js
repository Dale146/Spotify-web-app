import React from "react";
import { useState,useEffect,useContext } from "react";
import {  contextAccessToken,contextUserToken } from "../context";

function useAuth() {

    
    const [token, setToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        let storedToken = window.localStorage.getItem("token");
        
        if (!storedToken && hash) {
            storedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
            window.location.hash = "";
            window.localStorage.setItem("token", storedToken);
        }
        
        setToken(storedToken);
        

    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token")
        window.location.reload();
    }

    return {token, logout}
}

export default useAuth;