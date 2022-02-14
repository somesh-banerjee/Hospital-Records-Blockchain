import React, { useState } from "react";
import { create } from "ipfs-http-client";
import Contract from "../ethereum/superadmin";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ipfs = create("https://ipfs.infura.io:5001/api/v0");

const FileUpload = (props) => {
	const [fileHash, setFileHash] = useState({
		buffer: null,
		memeHash: "Qmc9TdNL5kDbKpv2XAPWtQPiqUj7bEi9Be8Tthh8ZnShD1",
	});

	const [input, setInput] = useState("");

	const handleInput = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		console.log(name);
		setInput(value);
	};

	const captureFile = (event) => {
		event.preventDefault();
		//console.log("File captured......")
		const file = event.target.files[0];
		const reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => {
			console.log("buffer", Buffer(reader.result));
			setFileHash({ buffer: Buffer(reader.result) });
		};
	};

	// Example Hash : "Qmc9TdNL5kDbKpv2XAPWtQPiqUj7bEi9Be8Tthh8ZnShD1"
	//Example URL: "https://ipfs.infura.io/ipfs/Qmc9TdNL5kDbKpv2XAPWtQPiqUj7bEi9Be8Tthh8ZnShD1"

	const wait = () =>
		toast.info("Taking you to the wallet", {
			position: "top-right",
			autoClose: 5000,
		});
	const transaction = () =>
		toast.info(
			"Initiating transaction. Wait for wallet to confirm transaction",
			{
				position: "top-right",
				autoClose: 10000,
			}
		);

	const success = () =>
		toast.success("Success! You file has been added to IPFS", {
			position: "top-right",
			autoClose: 5000,
		});
	const err = (e) =>
		toast.error(e, {
			position: "top-right",
			autoClose: 5000,
		});

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log("Submitting the form...");
		wait();
		const hash = await ipfs.add(fileHash.buffer);
		//const url = `https://ipfs.infura.io/ipfs/${hash.path}`;
		console.log(hash.path);
		const accounts = await window.ethereum.request({
			method: "eth_accounts",
		});
		try {
			transaction();
			await Contract.methods.upDoc(props.pAdd, hash.path, input).send({
				from: accounts[0],
			});
			setInput("");
			success();
		} catch (error) {
			console.log(error);
			err(error.message);
		}
	};

	if (props.admin) {
		return (
			<div>
				<h4> Upload the records</h4>

				<Form onSubmit={onSubmit}>
					<Form.Group controlId='formFile' className='mb-3'>
						<Form.Control
							type='text'
							placeholder='Enter file name'
							name='filename'
							value={input}
							onChange={handleInput}
						/>
						<Form.Control
							style={{ marginTop: 10, marginBottom: 10 }}
							type='file'
							onChange={captureFile}
						/>
						<Button variant='danger' type='submit'>
							Submit
						</Button>
					</Form.Group>
				</Form>
				<ToastContainer />
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default FileUpload;
