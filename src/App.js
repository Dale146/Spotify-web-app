import "./style.scss";
import React from "react";
import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";


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

     
    
      </Routes>
    </BrowserRouter>


   </>
  );
}

export default App;
