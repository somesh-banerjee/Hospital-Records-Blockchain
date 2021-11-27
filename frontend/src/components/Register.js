import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const Register = ({register}) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = () => {};

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
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>Email address</Form.Label>
							<Form.Control type='email' placeholder='Enter email' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>DOB</Form.Label>
							<Form.Control type='date' placeholder='Enter DOB' />
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>SEX</Form.Label>
							<Form.Select aria-label='Default select example'>
								<option>Select your Gender</option>
								<option value='1'>Male</option>
								<option value='2'>Female</option>
								<option value='3'>Other</option>
							</Form.Select>
						</Form.Group>
						<Form.Group className='mb-3' controlId='formBasicEmail'>
							<Form.Label>Aadhar</Form.Label>
							<Form.Control type='number' placeholder='Enter Aadhar Number' />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={handleClose}>
						Close
					</Button>
					<Button variant='outline-danger' onClick={handleSubmit}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Register;
