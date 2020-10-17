import React, { useContext } from 'react';
import { useForm } from './hooks/useForm';
import { v4 as uuid_v4 } from "uuid";
import './index.css'
import { ThemesForm } from './components/ThemesForm';

export const FormPrincipal = () => {

  
const {user, setUser} = useContext(ThemesForm)
console.log(user);

    const  [values, handleInputChange, reset]=useForm({
        id:uuid_v4(),
        name:'',
        apellidos:'',
        edad:'',
        email:'',
        password:'',
        password2:'',


    })



    const {name, apellidos,edad,email, password, password2} = values;

    

        const newName=name.substr(0,3);
        const newLast=apellidos.substr(0,3);
        const newUser=`${newName}${newLast}${edad}`;
        const newUserLower= newUser.toLowerCase();

        const objUser={
            
               
                newUserLower,
                password,
          

        }

       
    

    const isEnabled=name.length>0 && apellidos.length>0 && email.length>0 && password.length>0 

   const passwordValidation=password===password2 && password.length >= 8 && password2.length>=8

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(passwordValidation){
            console.log(values);
            setUser(objUser)
      

            
            
        }else{
            console.error(`Las claves son distintas`);
        }
      
    }










    return (
        <div>
        <div className="design">
            M
        </div>
        <div className="design1">
            <h1 className="titulo">Home Page</h1>
            </div>

          



            <hr />
       
<div className="prueba form-group row ">
<div className="col-5">

<form onSubmit={ handleSubmit }>
<h2 className="texto">Regístrate</h2>
    <input
    type="text"
    className="form-control mb-3 prueba1"
    name="name"
    autoComplete="off"
    placeholder="Tus nombres"
    onChange={ handleInputChange }
/>
       <input
    type="text"
    className="form-control mt-4"
    name="apellidos"
    autoComplete="off"
    placeholder="Tus apellidos"
    onChange={ handleInputChange }
    />
          <input
    type="text"
    className="form-control mt-4"
    name="edad"
    autoComplete="off"
    placeholder="Tu edad"
    onChange={ handleInputChange }
    />
          <input
    type="text"
    className="form-control mt-4"
    name="email"
    autoComplete="off"
    placeholder="Tu correo"
    onChange={ handleInputChange }

    />
          <input
    type="password"
    className="form-control mt-4"
    name="password"
    autoComplete="off"
    placeholder="Contraseña"
    onChange={ handleInputChange }
    />
          <input
    type="password"
    className="form-control mt-4"
    name="password2"
    autoComplete="off"
    placeholder="Repetir contraseña"
    onChange={ handleInputChange }

    />

    { !(password===password2)&& <p className="textoRojo">Las claves son distintas</p>}
    { !(password.length >= 8 && password2.length>=8)&& <p className="textoRojo">Las claves necesitan de 8 a más caracteres</p>}

<button 
type="submit"
disabled= {!isEnabled}

className="btn btn-secondary btn-block mt-3">
    Registrarse 
</button>


</form>


</div>





</div>
            
        </div>
    )
}
