import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import patients from "../data/patients";
import Nav from "../components/Nav";
import FileUpload from "../components/FileUpload";
import contract from "../ethereum/superadmin";

const PatientScreen = ({ match }) => {
	// const patient = patients.find((p) => p._id === match.params.id);
	const [patient, getPatient] = useState({
		address: "",
		name: "",
		aadhar: "",
		dob: "",
		sex: "",
		docs: [],
		docsD: []
	})
	
	const summary = async()=>{
		const sum = await contract.methods.getPatientDetails(match.params.id).call();
		getPatient(
			{
				address: match.params.id,
				name: sum[0],
				aadhar: sum[1],
				dob: sum[2],
				sex: sum[3],
				docs: sum[4],
				docsD: sum[5]
			}
		)
	}
	summary()
	// console.log(patient.name)
	
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
								<Col lg={4}>DATE OF BIRTH</Col>
								<Col lg={4}>{patient.dob}</Col>
							</Row>
							<Row>
								<Col lg={4}>SEX</Col>
								<Col lg={4}>{patient.sex}</Col>
							</Row>
							<Row>
								<Col lg={4}>aadhar</Col>
								<Col lg={4}>{patient.aadhar}</Col>
							</Row>
							<Row>
								<Col lg={4}>Address</Col>
								<Col lg={4}>{patient.address}</Col>
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
