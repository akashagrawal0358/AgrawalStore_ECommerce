import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
 const BigHeader = styled.header`
   padding: 0 4.8rem;
   height: 10rem;
   background-color: ${({ theme }) => theme.colors.bg};
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: relative;
 
   .logo {
     height: 5rem;
   }
   `
   
   return (
        <BigHeader>
            <NavLink to='/'>
                <img src="./Images/logo.png" alt="logo not found" />
            </NavLink>
            <Nav />
        </BigHeader>
    )
}
export default Header;