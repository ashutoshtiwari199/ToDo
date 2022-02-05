import React from 'react';
import { Nav, NavItem } from 'reactstrap';

const Navigation = () => {
  return (
    // <div>
    <Nav pills className='bg-dark text-white' >
      <NavItem className='px-5 py-3' >
          <h4 className='mx-3 fw-light' >ToDoList</h4>
      </NavItem>
    </Nav>
//   </div>
  );
};


export default Navigation;