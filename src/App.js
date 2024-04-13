import "./style.scss";
import React from "react";
import { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";

import Splash from "./Pages/Splash";
import Home from "./Pages/Home";


function App() {
  useEffect(() => {
    document.title = "My spotify App"; 
  }, []);
  return (
    <>
    <Router>
      <Routes>
      
      <Route exact path ="/" element ={<Splash/>}/>
      <Route path= "/home" element ={<Home/>}/>

     
    
      </Routes>
    </Router>


   </>
  );
}

export default App;
