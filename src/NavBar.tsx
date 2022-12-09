import React from "react";
//import "./NavBar.css";
import { NavLink, Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

/**
 * Renders a NavBar component
 * 
 * State: none
 * Props: none
 * 
 * App -> NavBar
 */

function NavBar() {
   return (
      <nav className="NavBar navbar navbar-expand-md">
         <div className="container-fluid">
            
            <Link className="navbar-brand" to="/">
              Pixly!!!
            </Link>
            <Nav className="ms-auto" navbar>
               <NavItem>
                  <NavLink to="/">Pixly Home</NavLink>
                  <NavLink to="/upload-image">Upload new image!</NavLink>
                  <NavLink to="edit-image">Edit an image!</NavLink>
               </NavItem>
            </Nav>
         </div>
      </nav>
   );
}

export default NavBar;