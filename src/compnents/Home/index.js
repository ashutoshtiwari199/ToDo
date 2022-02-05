import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./Navigation";
import Todo from "./Todo";

function index() {
  return (
    <div className=''>
      <Navigation/>
      <h1 className="fw-light text-center">ToDo List</h1>
      <Todo/>
    </div>
  );
}

export default index;
