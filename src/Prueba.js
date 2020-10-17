import React, { useState } from 'react'

export const Prueba = () => {

const [valor, setValor] = useState({
    area:'',
    office:'',
    name:'',
})

const {area, office, name} = valor;

const handleInputChange=({target})=>{
 
    setValor({...valor, [target.name]:target.value});
}

const handleSubmit=(e)=>{
e.preventDefault();
console.log(valor);


}



const handleClick=()=>{
console.log(valor);

 
}



    return (
        <div>
        <h1>Hola Mundo</h1>

        <form className="row" onSubmit={ handleSubmit }>
        <div className="form-group col-md-2">
      <label htmlFor="area">Área</label>
<select 
id="area" 
className="form-control"
name="area"
value={area}
onChange={handleInputChange}

>
<option>...</option>
<option>Administración</option>
<option>TI</option>
<option>Operaciones</option>
<option>Calidad</option>
<option>Recursos Humanos</option>
</select>
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="office">Office</label>
<select id="office" className="form-control">
<option >...</option>
<option>Sí</option>
<option>No</option>
</select>
    </div>


    <div className="form-group col-md-2">
    <input 
    type="text"
    className="form-control"
    autoComplete="off"
    name="name"
    value={ name }
    onChange={handleInputChange}
    />
    </div>
        </form>

<button
onClick={handleClick}
className="btn btn-warning btn-block"
>
AGREGAR
</button>



            
        </div>
    )
}
