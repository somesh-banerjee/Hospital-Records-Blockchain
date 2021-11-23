import React from "react";
import { ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import patients from "../data/patients";
import Nav from "../components/Nav";

const HospitalScreen = () => {
	return (
		<div>
            <Nav 
            />
			<h2 className='hospital-name'>Hospital name</h2>
			<Container>
				<h5>Patient List: </h5>
				<ListGroup as='ol' numbered>
					{patients.map((patient) => (
						<Link to={`/patient/${patient._id}`}>
							<ListGroup.Item as='li'>{patient.name}</ListGroup.Item>
						</Link>
					))}
				</ListGroup>
			</Container>
		</div>
	);
};

export default HospitalScreen;
