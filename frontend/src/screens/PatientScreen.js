import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "../components/Nav";
import FileUpload from "../components/FileUpload";
import contract from "../ethereum/superadmin";
import Contract from "../ethereum/superadmin";

const PatientScreen = ({ match }) => {
	// const patient = patients.find((p) => p._id === match.params.id);
	const [patient, getPatient] = useState({
		address: "",
		name: "",
		aadhar: "",
		dob: "",
		sex: "",
		docs: [],
		docsD: [],
	});

	const summary = async () => {
		const sum = await contract.methods
			.getPatientDetails(match.params.id)
			.call();
		getPatient({
			address: match.params.id,
			name: sum[0],
			aadhar: sum[1],
			dob: sum[2],
			sex: sum[3],
			docs: sum[4],
			docsD: sum[5],
		});
	};
	summary();

	const [admin, setAdmin] = useState(false);

	const checkAdmin = async () => {
		//console.log("entered fn");
		let accounts;
		try {
			accounts = await window.ethereum.request({
				method: "eth_accounts",
			});
			//console.log(accounts);
		} catch (err) {
			console.log(err);
			//this.setState({ errorMessage: err.message });
		}
		const isAdmin = await Contract.methods.checkAdmin(accounts[0]).call();
		setAdmin(isAdmin);
		//console.log(admin);
	};
	checkAdmin();

	const details = ["Name", "Date of Birth", "Sex", "Aadhar", "Address"];

	return (
		<div>
			<Nav name={patient.name} />
			<section className='mt-1'>
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
							<FileUpload admin={admin} pAdd={match.params.id} />
						</Col>
					</Row>
					<Row className='mt-5'>
						<Container>
							<h3>{patient.name}'s Documents 📃</h3>
							<Row>
								<Col lg={3}>
									{patient.docsD.forEach((docD) => {
										<Row>{docD}</Row>
									})}
								</Col>
								<Col lg={3}>
									{patient.docs.forEach((doc) => {
										<Row>{doc}</Row>
									})}
								</Col>
							</Row>
						</Container>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default PatientScreen;
