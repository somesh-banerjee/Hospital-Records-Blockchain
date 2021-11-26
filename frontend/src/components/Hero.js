import React, { useState } from 'react'
import { Button } from "react-bootstrap";
import Contract from "../ethereum/superadmin";
import { Redirect } from "react-router-dom";

const Hero = () => {

    const [url, setUrl] = useState("");

    const handleClick = async ()=> {
        let accounts;
        try {
            accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            console.log(accounts);
            
        } catch (err) {
            console.log(err);
            //this.setState({ errorMessage: err.message });
        }
        const isAdmin = await Contract.methods.checkAdmin(accounts[0]).call();
        const exist = await Contract.methods.checkPatient(accounts[0]).call();
        console.log(isAdmin);
        if(isAdmin){
            console.log("Admin");
            //redirect to admin page
            // <Redirect to={"/hospital/accounts[0]"} />
            setUrl(`/hospital/${accounts[0]}`);
        }else{
            console.log("yha pe log kr rha hu");
            if(exist){
                console.log("patient");
                //redirect to patient page
                // <Redirect push to={"/patient/accounts[0]"} />
                setUrl(`/patient/${accounts[0]}`);
                console.log("nhi ho rha");

            }else{
                //redirect to register page
                console.log("Go register idiot");

            }
        }
    }



    return (
        <div>
            	<section className='hero'>
				<div className='hero-content'>
					<h1 className='hero-title'>Health Zone</h1>

					<h2 className='hero-subtitle'>
						All your health records in one place. Safe and Secure!
					</h2>
                    <Redirect to={url} />

					<Button 
                    onClick={handleClick}
                    variant='danger' size="lg" className='sign-in-button' >Sign In</Button>
				</div>
			</section>
        </div>
    )
}

export default Hero
