import React from "react";
import { Navbar, Container } from "react-bootstrap";
import {Link} from "react-router-dom"

const Nav = (props) => {
	return (
		<div>
			<Navbar>
				<Container>
					<Navbar.Brand>{props.name}</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className='justify-content-end'>
						<Navbar.Text>
							Signed in as: {props.name}
						</Navbar.Text>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Nav;
