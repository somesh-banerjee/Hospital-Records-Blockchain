import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "../components/Nav";
import FileUpload from "../components/FileUpload";
import contract from "../ethereum/superadmin";
import Contract from "../ethereum/superadmin";
import "./Screen.css";

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
	// console.log(patient.docs);
	// console.log(patient.docsD);

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

	return (
		<div className='patientPage'>
			<Nav name={patient.name} />
			<section className='mt-1'>
				<Container>
					<h4>Patient details</h4>
					<Row className='table-row'>
						<Col className='table-col'>
							<Row className='table-row1'>
								<Col lg={4}>Name</Col>
								<Col lg={4}>{patient.name}</Col>
							</Row>
							<Row className='table-row2'>
								<Col lg={4}>DATE OF BIRTH</Col>
								<Col lg={4}>{patient.dob}</Col>
							</Row>
							<Row className='table-row1'>
								<Col lg={4}>SEX</Col>
								<Col lg={4}>{patient.sex}</Col>
							</Row>
							<Row className='table-row2'>
								<Col lg={4}>aadhar</Col>
								<Col lg={4}>{patient.aadhar}</Col>
							</Row>
							<Row className='table-row1'>
								<Col lg={4}>Address</Col>
								<Col lg={4}>{patient.address}</Col>
							</Row>
						</Col>
						<Col className='upload'>
							<FileUpload admin={admin} pAdd={match.params.id} />
						</Col>
					</Row>
					<Row className='mt-5'>
						<Container>
							<h4>{patient.name}'s Documents 📃</h4>

							<Row>
								<Col className='table-row3' lg={3}>
									{patient.docsD.map((docD, index) => (
										<div key={index} className='table-row4'>{docD}</div>
									))}
								</Col>
								<Col className='table-row3' lg={3}>
									{patient.docs.map((doc, index) => (
										<a
											href={`https://ipfs.infura.io/ipfs/${doc}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<div key={index} className='table-row4'>{doc}</div>
										</a>
									))}
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
