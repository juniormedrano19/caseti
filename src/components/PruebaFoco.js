import React, { useRef, useEffect } from 'react';
import { useForm } from '../hooks/useForm'

export const PruebaFoco = () => {



  /*   console.log(current); */

   /*  const handleClick=()=>{
        if(ref.current){
            ref.current.focus();
            console.log(`Hola`)
        }
        
    
    } */





/* useEffect(() => {


    return () =>{
        ref.current=false
    }



    
}, [])  */







const [values, handleInputChange, reset]=useForm({
    name:'',
    valor:''
})

const {name,valor} = values;




    return (
        <div>
        <h1>Prueba</h1>
        <hr />

<div className="form-group">
        <input 
            className="form-control mb-2"
            name="name"
            id="name"
            type="text"
            autoComplete="off"
            placeholder="Datos"
          
            onChange={handleInputChange}
            value={name}
           
            
        />
        <button 
     
        className="btn btn-primary btn-block"
       
        >Click </button>
        </div>

        {
            (name.length >1 )?<h1>JIRa</h1> : <h2>Fuera</h2>
      

         
                 
                  }
            
        </div>
    )
}
