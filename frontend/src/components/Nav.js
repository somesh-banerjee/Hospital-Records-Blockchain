import React from "react";
import { Navbar, Container } from "react-bootstrap";
import './components.css'

const Nav = (props) => {
	return (
		<div>
			<Navbar className="topnav" >
				<Container>
					<Navbar.Brand as='h1' className='navbar-brand ml-5' >{props.name}</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Nav;
