import React from 'react';
import { Nav, NavItem } from 'reactstrap';

const Navigation = ({value}) => {

  const {setThemeColor,themeColor} = value;

  const handleTheme=()=>{
    if(themeColor==="dark"){
      setThemeColor("secondary")
    } else{
      setThemeColor("dark")
    }

  }

  return (
    <Nav pills className= {`${value.themeColor} nav-shadow  d-flex justify-content-around`} >
      <NavItem className='px-5 py-1 ' >
          <h3 className='mx-3 my-1 fw-light' >ToDoList {} </h3>
      </NavItem>
      <NavItem className='px-5 py-3 ' >
          <input type="checkbox" className="checkbox" id="checkbox" onChange={handleTheme} />
          <label for="checkbox" className="label"  >
          <i className="fas fa-moon"></i>
          <i className='fas fa-sun'></i>
          <div className='ball'/>
          </label>
      </NavItem>
    </Nav>
  );
};


export default Navigation;