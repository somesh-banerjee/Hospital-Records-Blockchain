import React from "react";
import { Navbar, Container } from "react-bootstrap";
import {Link} from "react-router-dom"

const Nav = ({name}) => {
	return (
		<div>
			<Navbar>
				<Container>
					<Navbar.Brand>{name}</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>
							Signed in as: Hospital name
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Nav;
