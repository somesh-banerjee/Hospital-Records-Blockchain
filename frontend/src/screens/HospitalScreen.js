import React from "react";
import { ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import patients from "../data/patients";
import Nav from "../components/Nav";
import contract from "../ethereum/superadmin";

const HospitalScreen = () => {

	const fetch = async(props) => {
	
		const summary = await contract.methods.getHosDetails(props.query.address).call();
		
		console.log(summary);
		return {
			address: props.query.address,
			name: summary[0]
		};
	  }

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
