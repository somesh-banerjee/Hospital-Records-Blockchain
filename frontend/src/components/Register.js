import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import Contract from "../ethereum/superadmin";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [details, setDetails] = useState({
		name: "",
		dob: "",
		sex: "",
		aadhar: "",
	});

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;

		setDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	};

	const transaction = () => toast.info('Initiating transaction. Wait for wallet to confirm transaction', {
			position: "top-right",
			autoClose: 5000,
			});
	const success = () => toast.success('Success! You can now login', {
			position: "top-right",
			autoClose: 5000,
			});
	const err = () => toast.error('Oops! An error occurred. Please try again!', {
			position: "top-right",
			autoClose: 5000,
			});
	const handleSubmit = async () => {
		console.log(details);
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});
		try {
			transaction()
			await Contract.methods
				.newPatient(details.name, details.aadhar, details.dob, details.sex)
				.send({
					from: accounts[0],
				});
			success()
		} catch (error) {
			console.log(error);
			err()
		}
	};

	return (
		<div>
			<Button
				onClick={handleShow}
				variant='light'
				size='lg'
				className='sign-in-button'
			>
				Register
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Register yourself</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								name='name'
								value={details.name}
								onChange={handleChange}
								type='text'
								placeholder='Enter name'
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>DOB</Form.Label>
							<Form.Control
								name='dob'
								value={details.dob}
								onChange={handleChange}
								type='date'
								placeholder='Enter DOB'
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>SEX</Form.Label>
							<Form.Select
								name='sex'
								value={details.sex}
								onChange={handleChange}
								aria-label='Default select example'
							>
								<option>Select your Gender</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
								<option value='Other'>Other</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Aadhar</Form.Label>
							<Form.Control
								name='aadhar'
								value={details.aadhar}
								onChange={handleChange}
								type='number'
								placeholder='Enter Aadhar Number'
							/>
						</Form.Group>
						<Button variant='outline-danger' onClick={handleSubmit}>
							Submit
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<ToastContainer
			/>
		</div>
	);
};

export default Register;
