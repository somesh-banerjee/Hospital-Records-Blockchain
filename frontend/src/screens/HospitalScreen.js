import React, { useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import patients from "../data/patients";
import Nav from "../components/Nav";
import contract from "../ethereum/superadmin";

const HospitalScreen = ({ match }) => {

	const [Hospital, getHospital] = useState({
		address: "",
		name: ""
	})

	const [PatientList, getPatientList] = useState({
		list: []
	})
	
	const summary = async()=>{
		const sum = await contract.methods.getHosDetails(match.params.id).call();
		getHospital(
			{
				address: match.params.id,
				name: sum
			}
		)

		const sum2 = await contract.methods.getPatients().call();
		getPatientList(
			{
				list: sum2
			}
		)
	}
	summary()
	// console.log(PatientList);

	return (
		<div>
            <Nav 
				name={Hospital.name}
			/>
			<Container>
				<h5>Patient List: </h5>
				<ListGroup as='ol' numbered>
					{PatientList.list.map((patient) => (
						<Link to={`/patient/${patient}`}>
							<ListGroup.Item  key={patient} as='li'>{patient}</ListGroup.Item>
						</Link>
					))}
				</ListGroup>
			</Container>
		</div>
	);
};

export default HospitalScreen;
