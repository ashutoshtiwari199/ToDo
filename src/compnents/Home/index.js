import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import Todo from "./Todo";

import {useState} from 'react'

function Index() {

  const [themeColor, setThemeColor]= useState("dark")

  return (
    <div className={`${themeColor} todo-container`} >
      <Navigation value={{themeColor,setThemeColor}} />
      <h1 className="fw-light text-center">ToDo List</h1>
      <Todo value={{themeColor}} />
    </div>
  );
}

export default Index;
