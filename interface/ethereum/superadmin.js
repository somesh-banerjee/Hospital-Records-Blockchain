import web3 from './web3';
import SuperAdmin from './contracts/superadmin.json';

const instance = new web3.eth.Contract(
	JSON.parse(SuperAdmin.interface),
	'0x'
);

export default instance;