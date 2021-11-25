import React, { useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import patients from "../data/patients";
import Nav from "../components/Nav";

<<<<<<< Updated upstream
const HospitalScreen = () => {
=======
const HospitalScreen = ({ match }) => {

	
	const [Hospital, getHospital] = useState({
		address: "",
		name: ""
	})
	
	const summary = async()=>{
		const sum = await contract.methods.getHosDetails(match.params.id).call();
		getHospital(
			{
				address: match.params.id,
				name: sum
			}
		)
	}
	summary()

>>>>>>> Stashed changes
	return (
		<div>
            <Nav 
            />
			<h2 className='hospital-name'>{Hospital.name}</h2>
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
