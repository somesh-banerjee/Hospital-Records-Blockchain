import React from 'react'
import { Button } from "react-bootstrap";

const Hero = () => {

    const handleClick = async ()=> {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        console.log(accounts);
    }



    return (
        <div>
            	<section className='hero'>
				<div className='hero-content'>
					<h1 className='hero-title'>Health Zone</h1>

					<h2 className='hero-subtitle'>
						All your health records in one place. Safe and Secure!
					</h2>

					<Button 
                    onClick={handleClick}
                    variant='danger' size="lg" className='sign-in-button' >Sign In</Button>
				</div>
			</section>
        </div>
    )
}

export default Hero
