import web3 from './ethereum/web3'

login = async() => {
    try {
        const accounts = await web3.eth.requestAccounts();
        return accounts[0];
        
    } catch (err) {
        //this.setState({ errorMessage: err.message });
    }
}

export {login};