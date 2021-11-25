import React from 'react'
import { Button } from "react-bootstrap";
<<<<<<< Updated upstream
=======
import Contract from "../ethereum/superadmin";
import { Redirect } from "react-router-dom";
>>>>>>> Stashed changes

const Hero = () => {

    const handleClick = async ()=> {
<<<<<<< Updated upstream
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        // console.log(accounts);
=======
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
        console.log(isAdmin);
        if(isAdmin){
            //redirect to admin page
            return <Redirect to={"/hospital"} />
        }else{
            const exist = await Contract.methods.checkPatient(accounts).call();
            if(exist){
                //redirect to patient page
            }else{
                //redirect to register page
            }
        }
>>>>>>> Stashed changes
    }



    return (
        <div>
            	<section className='hero'>
				<div className='hero-content'>
					<h1 className='hero-title'>Health Zone</h1>

					<h2 className='hero-subtitle'>
						All your health records in one place. Safe and Secure!
					</h2>

<<<<<<< Updated upstream
					<Button 
                    onClick={handleClick}
=======
					<Button
                    onClick = {handleClick}
>>>>>>> Stashed changes
                    variant='danger' size="lg" className='sign-in-button' >Sign In</Button>
				</div>
			</section>
        </div>
    )
}

export default Hero
