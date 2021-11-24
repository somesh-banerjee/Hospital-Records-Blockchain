import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import patients from "../data/patients";
import Nav from "../components/Nav";
import FileUpload from "../components/FileUpload";

const PatientScreen = ({ match }) => {
	const patient = patients.find((p) => p._id === match.params.id);

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
