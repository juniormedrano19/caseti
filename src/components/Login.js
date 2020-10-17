import React, { useContext } from 'react';
import { ThemesForm } from './ThemesForm';



export const Login = () => {

    const {user} = useContext(ThemesForm)
    const { newUserLower, password} = user
 
console.log(user);


    return (
        <div>
        <h1>Login</h1>
        <hr />
        <pre>
        {JSON.stringify( user, null, 3)}
        </pre>
        <div className="prueba form-group row ">
<div className="col-4">

<form >
<h2 className="texto">Iniciar Sesión</h2>
    <input
    type="text"
    className="form-control mb-3 prueba1"
    name="name"
    autoComplete="off"
    placeholder="Tu usuario"
    value={newUserLower}


  
/>
    
         
          <input
    type="password"
    className="form-control mt-4"
    name="password"
    autoComplete="off"
    placeholder="Contraseña"
  
    />
          

   

<button 
type="submit"

className="btn btn-primary btn-block mt-3">
   Iniciar Sesión
</button>


</form>


</div>





</div>
            
        </div>
    )
}
