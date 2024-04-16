import "./style.scss";
import React from "react";
import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import SingleAlbum from "./Pages/SingleAlbum";
import SinglePlaylist from "./Pages/SinglePlaylist";


function App() {
  useEffect(() => {
    document.title = "My spotify App"; 
  }, []);
  return (
    <>
    <BrowserRouter basename="my-app">
      <Routes>
      
      <Route exact path ="/" element ={<Splash/>}/>
      <Route path= "/pages/Home" element ={<Home/>}/>
      <Route path="/album/:id" element={<SingleAlbum/>}/>
      <Route path="/playlist/:id" element={<SinglePlaylist/>}/>
    
      </Routes>
    </BrowserRouter>


   </>
  );
}

export default App;
