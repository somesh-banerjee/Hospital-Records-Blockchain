import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import patients from "../data/patients";
import Nav from "../components/Nav";

const PatientScreen = ({ match }) => {
    const patient = patients.find((p) => p._id === match.params.id)

	return (
		<div>
            <Nav 
                name={patient.name}
            />
			<section id='patient'>
				<Container>
					<Row>
						<Col lg={2}>Name</Col>
						<Col lg={2}>{patient.name}</Col>
					</Row>
					<Row>
						<Col lg={2}>email</Col>
						<Col lg={2}>{patient.email}</Col>
					</Row>
					<Row>
						<Col lg={2}>DATE OF BIRTH</Col>
						<Col lg={2}>{patient.dob}</Col>
					</Row>
					<Row>
						<Col lg={2}>SEX</Col>
						<Col lg={2}>{patient.email}</Col>
					</Row>
					<Row>
						<Col lg={2}>aadhar</Col>
						<Col lg={2}>{patient.aadhar}</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default PatientScreen;
