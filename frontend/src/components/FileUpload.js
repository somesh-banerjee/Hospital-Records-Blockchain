import React, {useState} from "react";
import { create } from "ipfs-http-client";


const ipfs = create('https://ipfs.infura.io:5001/api/v0')

const FileUpload = () => {

    const [fileHash, setFileHash] = useState({
        buffer: null,
        memeHash:"Qmc9TdNL5kDbKpv2XAPWtQPiqUj7bEi9Be8Tthh8ZnShD1"
    });

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

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log("Submitting the form...");
		const hash = await ipfs.add(fileHash.buffer);
		const url = `https://ipfs.infura.io/ipfs/${hash.path}`;
		console.log(hash.path);
	};

	return (
		<div>
			<h2> Upload the records</h2>

			<form onSubmit={onSubmit}>
				<input type='file' onChange={captureFile} />
				<input type='submit' />
			</form>
		</div>
	);
};

export default FileUpload;
