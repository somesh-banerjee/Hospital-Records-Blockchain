import web3 from './ethereum/web3.js'
import { create } from 'ipfs-http-client'

const login = async() => {
    console.log("Im called");
    try {
        const accounts = await web3.eth.requestAccounts();
        return accounts[0];
        
    } catch (err) {
        console.log(err);
        //this.setState({ errorMessage: err.message });
    }
}



const client = create('https://ipfs.infura.io:5001/api/v0')

const captureFile = (event) =>{
    // event.preventDefault()
    //console.log("File captured......")
    const file= event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
        console.log('buffer', Buffer(reader.result))
        this.setState({buffer: Buffer(reader.result)})
    }
    
}

export default login;