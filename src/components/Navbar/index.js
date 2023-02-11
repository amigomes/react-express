import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import logo from '../../assets/aitoollogo.png';
import './navbar.css';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/' activeStyle>
			<div id="logo">
					<img className="logo" src={logo}/>
			</div>
		</NavLink>
		<NavLink to='/submit' activeStyle>
			Submit New Tool
		</NavLink>
		<NavLink to='/news' activeStyle>
			News
		</NavLink>
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		{/* <NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
		</NavBtn> */}
	</Nav>
	</>
);
};

export default Navbar;