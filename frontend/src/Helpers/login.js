import web3 from './ethereum/web3.js'
import { create } from 'ipfs-http-client'
import contractInstance from './../../ethereum/superadmin'

const login = async() => {

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        console.log(accounts);
        
    } catch (err) {
        console.log(err);
        //this.setState({ errorMessage: err.message });
    }
    const isAdmin = await contractInstance.methods.checkAdmin(accounts).call();
    if(isAdmin){
        //redirect to admin page
    }else{
        const exist = await contractInstance.methods.checkPatient(accounts).call();
        if(exist){
            //redirect to patient page
        }else{
            //redirect to register page
        }
    }
}

const register = async() => {
    
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