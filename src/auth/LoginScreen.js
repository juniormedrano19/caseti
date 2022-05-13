import React from 'react';
import present from '../img/present.svg';
import cassete from '../img/cassete.png';
import google from '../img/google.png';



export const LoginScreen = () => {
  return (
    <div className='login-principal'>{/* contenedorLogin */}
        <div  className='contenedorLogin login-contenedor'>
        <div className='login-firstPart'>
            <div className='formulario-Main' >
{/*   <img src={cassete} height="100" /> */}
<h2 >InvenTI</h2>
            <p >Welcome back! Please enter your details.</p>

            <form className="formulario-login">
                <div className='campo'>
                <label for="email" className="label-form">Email</label>
                <input name="email" 
                className="input-form" 
                type="text"
                 autoComplete="off"
                 placeholder="Enter your email"
                 
                 />
                </div>
                <div className='campo'>
                <label for="password" className="label-form">Password</label>
                <input name="password" 
                className="input-form" 
                type="text" 
                autoComplete="off"
                placeholder="**********"
                />
                </div>
               
                
                <div className="opciones-check">
                    <span className="check-text">
                    <input type='checkbox' name='check' id="check" />
                    <label for="check">Remember me</label>
                    </span>
                
                    <a href="#" className='enlace-forgot'>Forgot Password</a>
                </div>


                <a href="#" className="btn btn-signIn">Sign in</a>
                <a href="#" className="btn-socialGoogle btn"><span className='centrar'>

                    <img src={google}/> <span>Sign in with Google</span> 
                    
                    </span></a>
                
                <span className="text-noAccount">Don't have an account?  <a href="#" className="enlace-register">Sign up to free</a></span>
            
            </form>

            </div>
          
            


        </div>
        <div className='login-secondPart'>
            <img src={present} className="portada-login"/>
        </div>
        </div>
        
    </div>
  )
}
