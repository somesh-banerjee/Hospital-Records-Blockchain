import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import PatientScreen from "./screens/PatientScreen";
import HospitalScreen from "./screens/HospitalScreen";

function App() {
	return (
		<Router>
		
			<Route exact path='/' component={HomeScreen} />
			<Route path='/patient/:id' component={PatientScreen} />
			<Route path='/hospital' component={HospitalScreen} />
	
		</Router>
	);
}

export default App;
