import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import patients from "../data/patients";
import Nav from "../components/Nav";
import FileUpload from "../components/FileUpload";
import contract from "../ethereum/superadmin";

const PatientScreen = ({ match }) => {
	const patient = patients.find((p) => p._id === match.params.id);
	
	const summary = async()=>{
		const sum = await contract.methods.getPatientDetails(match.params.id).call();
		console.log(sum);
	} 
	
	// console.log(summary);
	// const  {
	// 	address: match.params.id,
	// 	name: summary[0],
	// 	aadhar: summary[1],
	// 	dob: summary[2],
	// 	sex: summary[3],
	// 	docs: summary[4],
	// 	docsD: summary[5]
	// };


	return (
		<div>
			{summary}
			<Nav name={patient.name} />
			<section id='patient'>
				<Container>
					<Row>
						<Col>
							<Row>
								<Col lg={4}>Name</Col>
								<Col lg={4}>{patient.name}</Col>
							</Row>
							<Row>
								<Col lg={4}>email</Col>
								<Col lg={4}>{patient.email}</Col>
							</Row>
							<Row>
								<Col lg={4}>DATE OF BIRTH</Col>
								<Col lg={4}>{patient.dob}</Col>
							</Row>
							<Row>
								<Col lg={4}>SEX</Col>
								<Col lg={4}>{patient.email}</Col>
							</Row>
							<Row>
								<Col lg={4}>aadhar</Col>
								<Col lg={4}>{patient.aadhar}</Col>
							</Row>
						</Col>
						<Col>
							<FileUpload />
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default PatientScreen;
