import React, { useState, useEffect, useReducer, useRef, useCallback } from 'react';
import { v4 as uuid_v4 } from "uuid";
import { useForm } from '../hooks/useForm';
import { InventoryReducer } from './InventoryReducer';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../index.css'


//[values, handleInputChange, reset];


const init=()=>{
    return JSON.parse(localStorage.getItem('datos')) || []
}

/* const initialState=[{
    id:uuid_v4(),
    propietario:'prueba',
area:'prueba',
office:'prueba',
piso:'prueba',
direccionIp:'prueba',
modelo:'prueba',
marca:'prueba',
numSerie:'prueba',
procesador:'prueba',
sizeDisk:'prueba',
systemOper:'prueba',
hostname:'prueba',
memoria:'prueba',
auricular:'prueba',
versionSip:'prueba',
correo:'prueba',
anexo:'prueba',
    done:false,
}] */

export const Inventario = () => {

const [values, handleInputChange, reset]=useForm({
    id:uuid_v4(),
    propietario:'',
    area:'',
    office:'',
    piso:'',
    direccionIp:'',
    modelo:'',
    marca:'',
    numSerie:'',
    procesador:'',
    sizeDisk:'',
    systemOper:'',
    hostname:'',
    memoria:'',
    auricular:'',
    versionSip:'',
    correo:'',
    anexo:'',
        done:false,

})

const {propietario, area, office, piso, direccionIp, modelo, marca, numSerie, procesador, sizeDisk, systemOper, hostname, memoria, auricular, versionSip, correo, anexo} = values;


    const [datos, dispatch] = useReducer( InventoryReducer,[],init)




console.log(datos);


useEffect(() => {
    localStorage.setItem('datos', (JSON.stringify(datos)))
   
}, [datos])


const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(piso);
if(direccionIp.trim().length <=1 && hostname.trim().length <=1 && piso.trim().length <=1){
    return;
} 
    const newData={
        id:uuid_v4(),
        propietario,
        area,
        office,
        piso,
        direccionIp,
        modelo,
        marca,
        numSerie,
        procesador,
        sizeDisk,
        systemOper,
        hostname,
        memoria,
        auricular,
        versionSip,
        correo,
        anexo,
    done:false,
    }

    const action={
        type:'add',
        payload:newData,
    }

    dispatch(action)
reset();
}



const handleDelete=(idData)=>{

dispatch({
    type:'delete',
    payload:idData,
})


}

const handleToggle=(todoId)=>{

    dispatch({
        type:'toggle',
        payload:todoId,
    })

}


//PARA EL BOTON SEARCH


/* const [search, setSearch] = useState("Hola")

const handleInputSearch=({target})=>{
const { value } = target; 

setSearch(
     value
)

console.log(search);
}

 */

 /* useEffect(() => {
    document.querySelector('#search').addEventListener('focus',()=>{
        console.log('hola mundo')
      });
      
      document.querySelector('#search').addEventListener('blur',()=>{
          console.log('estas afuera cojudo')
        });
      
     
 }, [])
 */








 /* const refSearch = useRef(false); */
/*  const joda= refSearch?'true' : 'eres más falso ctm' */

/* const focus = () => {
    refSearch.current.focus();
    console.log(`estás dentro`)
   
  }


  
const blur = () => {
    refSearch.current.blur();
    console.log(`estás fuera`)
   
  } */







    




/* console.log(refSearch) */
/* useEffect(() => {
    refSearch.current.blur()
    return () => {
        refSearch.current.focus()
    }
}, [refSearch.current]) */


/* const refSearch = useRef(true)
const {current} = refSearch
  */


       
       



/* 
const focus = () => {
    refSearch.current.focus();
   
  } */




  
  

 


const [search1,handleInputSearch,resetear]= useForm({
    search:''
})
const {search} = search1

console.log(search);
 const dataStore=init();
/*  const pruebas123=dataStore.map((hola)=>hola.id);  */

/* const arregloPrimario=[{id:"b1d08fad-86e5-4712-a901-101866944eef",propietario:"Junior Medrano",area:"Administración",office:"Sí",piso:"4",direccionIp:"192.9.60.61",modelo:"Optiplex 3020",marca:"Dell Inc.",numSerie:"",procesador:"Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz",sizeDisk:"466",systemOper:"Microsoft Windows 10 Pro",hostname:"PC-PE-04",memoria:"4",auricular:"Jabra BIZ 1500",versionSip:"7.7.8.0",correo:"",anexo:"",done:false},{id:"c1fe6fda-ea79-42d1-83e8-0cb3e6d3de97",propietario:"Luis Montalván",area:"Administración",office:"Sí",piso:"5",direccionIp:"192.9.60.58",modelo:"Optiplex 3020",marca:"Hewlett Packard",numSerie:"PC-PE-040",procesador:"Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz",sizeDisk:"466",systemOper:"Microsoft Windows 10 Pro",hostname:"PC-PE-15",memoria:"8",auricular:"Jabra UC VOICE 550a MS",versionSip:"7.7.8.0",correo:"",anexo:"5040",done:false}] */
/* var res= arregloPrimario.filter((item)=>
     Object.keys(item).some((key)=>item[key].includes(search))
)  */



/* let dataStore=['Junior','Bryan','Luis','Marcos','Raúl'] */




/* 
let res=dataStore.filter(o =>
    Object.keys(o).some(k => o[k].toLowerCase().includes(search.toLowerCase()))); */


/* let res=dataStore.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(search.toString().toLowerCase()))); */

let res = dataStore.filter(o=>Object.values(o).toString().toLowerCase().includes(search)) 


init();

/* `${JSON.stringify(res)}` */
/* 
if(res){
    console.log(`${JSON.stringify(res)}`);
}else{
    return;
}  */
useEffect(() => {
    dataStore.filter(o=>Object.values(o).toString().toLowerCase().includes(search))
}, [search])




    return (
        <div className='contenedorXlsx'>
        <div className="cabecera-tickets contenedorXlsx">
        <div className="title-excel">
        <h1>Inventario Empresarial </h1>
        </div>
      
            <div className="nav-ticketsButtons">
              <form 
              className="formulario-search"
            
              >
           
<input
type="text"
id="search"
className="input-searchTickets"
name="search"
autoComplete="off"
placeholder="Search"
value={search}
onChange={ handleInputSearch }


/>







        
    <button 
   
    className="btn btn-searchTickets" 
    type="submit"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
    </form>
    <div className="col-4">
            <ReactHTMLTableToExcel 
                id="botonExportarExcel"
                className="btn btn-descargarExcelTickets"
                table="tablaInventario"
                filename="Inventario"
                sheet="Datos_Inventario"
                buttonText="Descargar Excel"

                
            />
           </div>
    </div>
        
        </div>


        
    
        <form className="hola" onSubmit={handleSubmit}>
        <fieldset className="scheduler-border">
        <legend className="scheduler-border">Inventario</legend>

<div className="form-row">
<div className="form-group col-md-2">
<label htmlFor="propietario">Propietario</label>
<select 
id="propietario" 
className="form-control"
name="propietario"
value={propietario}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>Junior Medrano</option>
<option>Luis Montalván</option>
<option>Juan Manuel Santos</option>
<option>Ricardo Andrada</option>
<option>María Basallo</option>
<option>Agente</option>
</select>
    </div>
    <div className="form-group col-md-2">
      <label htmlFor="area">Área</label>
<select 
id="area" 
className="form-control"
name="area"
value={area}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>Administración</option>
<option>TI</option>
<option>Operaciones</option>
<option>Calidad</option>
<option>Recursos Humanos</option>
</select>
    </div>

<div className="form-group col-md-2">
<label htmlFor="office">Office</label>
<select 
id="office" 
className="form-control"
name="office"
value={office}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>SI</option>
<option>NO</option>
</select>
    </div>
    

<div className="form-group col-md-2">
<label htmlFor="piso">Piso (*)</label>
<select 
id="piso" 
className="form-control"
value={ piso } 
name="piso"
onChange={handleInputChange} 
>
<option defaultValue>...</option>
<option >4</option>
<option>5</option>
<option >6</option>
<option >7</option>
</select>
    </div>

    
<div className="form-group col-md-2">
<label htmlFor="ip">Dirección IP (*) </label>
<input
type="text"
id="ip"
className="form-control"
name="direccionIp"
autoComplete="off"
placeholder="Dirección IP"
value={direccionIp}
onChange={ handleInputChange }

/>
</div>

    <div className="form-group col-md-2">
    <label htmlFor="modelo">Modelo</label>
<select 
id="modelo" 
className="form-control"
name="modelo"
value={modelo}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>Optiplex 3020</option>
<option>Optiplex 3040</option>
<option>Vostro 3470</option>
</select>
    </div>


  </div>





<div className="form-row">
<div className="form-group col-md-2">
<label htmlFor="marca">Marca</label>
<select 
id="marca" 
className="form-control"
name="marca"
value={marca}
onChange={handleInputChange}
 >
<option defaultValue>...</option>
<option>Dell Inc.</option>
<option>Hewlett Packard</option>
<option>Lenovo</option>
</select>
</div>



    <div className="form-group col-md-2">
    <label htmlFor="ip">Número de Serie</label>
    <input
    type="text"
    className="form-control"

    autoComplete="off"
    placeholder="Número de serie"
    name="numSerie"
    value={numSerie}
    onChange={ handleInputChange }

    />
    </div>
    <div className="form-group col-md-4">
    <label htmlFor="procesador">Procesador</label>
<select 
id="procesador" 
className="form-control"
name="procesador"
value={procesador}
onChange={ handleInputChange }

>
<option defaultValue>...</option>
<option>Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz
</option>
<option>AMD A8-5550M APU with Radeon(tm) HD Graphics   
</option>
<option>Intel(R) Core(TM) i3-4160 CPU @ 3.60GHz
</option>
</select>
    </div>
    

    <div className="form-group col-md-2">
    <label htmlFor="disco">Tamaño Disco</label>
<select
 id="disco" 
 className="form-control"
 name="sizeDisk"
value={sizeDisk}
onChange={handleInputChange}
 >
<option defaultValue>...</option>
<option>466
</option>
<option>699 
</option>
<option>932
</option>
</select>
    </div>

<div className="form-group col-md-2">
<label htmlFor="sistema">Sistema Operativo</label>
<select 
id="sistema" 
className="form-control"
name="systemOper"
value={systemOper}
onChange={handleInputChange}

>
<option defaultValue>...</option>
<option>Microsoft Windows 10 Pro

</option>
<option>Ubuntu
</option>

</select>
    </div>

   


  </div>



  <div className="form-row">
  <div className="form-group col-md-2">
    <label htmlFor="modelo">Hostname(*)</label>
    <input
    type="text"
    className="form-control"
    name="hostname"
    autoComplete="off"
    placeholder="Nombre de equipo"
    value= { hostname }
    onChange={ handleInputChange }

    />
    </div>

    <div className="form-group col-md-2">
    <label htmlFor="memoria">Memoria</label>
<select 
id="memoria"
 className="form-control"
 name="memoria"
value={memoria}
onChange={handleInputChange}
 
 
 >
<option defaultValue>...</option>
<option>4
</option>
<option>8 
</option>
<option>12
</option>
<option>20
</option>
<option>32
</option>
</select>
    </div>

<div className="form-group col-md-2">
<label htmlFor="auricular">Auricular</label>
<select 
id="auricular" 
className="form-control"
name="auricular"
value={auricular}
onChange={handleInputChange}

>
<option defaultValue>...</option>
<option>Jabra BIZ 1500
</option>
<option>Jabra UC VOICE 550a MS
</option>
<option>Jabra EVOLVE 20 
</option>
<option>Logitech MeetUp Speakerphone
</option>
</select>
</div>

    <div className="form-group col-md-2">
    <label htmlFor="version">Versión</label>
<select 
id="version" 
className="form-control"
name="versionSip"
value={versionSip}
onChange={handleInputChange}

>
<option defaultValue>...</option>
<option>7.7.8.0
</option>
</select>
    </div>
    

    <div className="form-group col-md-2">
    <label htmlFor="disco">Correo del propietario</label>
    <input
    type="text"
    className="form-control"
    name="correo"
    autoComplete="off"
    placeholder="Correo del propietario"
    value={correo}
    onChange={handleInputChange}
    />
    </div>
    <div className="form-group col-md-2">
    <label htmlFor="sistema">Anexo</label>
    <input
    type="text"
    className="form-control"
    name="anexo"
    autoComplete="off"
    placeholder="Anexo"
    value= { anexo }
    onChange={ handleInputChange }
    />
    </div>

  

  </div>


<button type="submit"
className="btn btn-primary btn-block mt-3">Agregar elemento al Inventario</button>















</fieldset>

</form>

{(search.length>0)&&<h2>{`${res.length} coincidencias con su búsqueda`}</h2>}
<div className="row">

<div className="col-12">
<table 
className="table table-bordered table-responsive-md text-center"
id="tablaInventario"
>

<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Propietario</th>
      <th scope="col">Área</th>
      <th scope="col">Office</th>
      <th scope="col">Piso</th>
      <th scope="col">Dirección Ip</th>
      <th scope="col">Modelo</th>
      <th scope="col">Marca</th>
      <th scope="col">N° Serie</th>
      <th scope="col">Procesador</th>
      <th scope="col">Tamaño Disco</th>
      <th scope="col">Sistema Operativo</th>
      <th scope="col">Hostname</th>
      <th scope="col">Memoria</th>
      <th scope="col">Auricular</th>
      <th scope="col">Version Sip</th>
      <th scope="col">correo</th>
      <th scope="col">Anexo</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
  {

   (search.length>1)?( res.map((data,i)=>(

<tr key={data.id}>


<th scope="row">{`${i+1}`}</th>
<td>{data.propietario}</td>
<td>{data.area}</td>
<td>{data.office}</td>
<td>{data.piso}</td>
<td>{data.direccionIp}</td>
<td>{data.modelo}</td>
<td>{data.marca}</td>
<td>{data.numSerie}</td>
<td>{data.procesador}</td>
<td>{data.sizeDisk}</td>
<td>{data.systemOper}</td>
<td>{data.hostname}</td>
<td>{data.memoria}</td>
<td>{data.auricular}</td>
<td>{data.versionSip}</td>
<td>{data.correo}</td>
<td>{data.anexo}</td>
<td><div className="separacion">
<button 
className="btn btn-danger ml-1 mr-1"
onClick={ ()=>handleDelete(data.id) }
> Borrar </button>
<button 
onClick={()=>handleToggle(data.id)}
className="btn btn-success">Editar</button>

</div></td>

</tr>
 
))):( datos.map((data,i)=>(

<tr key={data.id}>


<th scope="row">{`${i+1}`}</th>
<td>{data.propietario}</td>
<td>{data.area}</td>
<td>{data.office}</td>
<td>{data.piso}</td>
<td>{data.direccionIp}</td>
<td>{data.modelo}</td>
<td>{data.marca}</td>
<td>{data.numSerie}</td>
<td>{data.procesador}</td>
<td>{data.sizeDisk}</td>
<td>{data.systemOper}</td>
<td>{data.hostname}</td>
<td>{data.memoria}</td>
<td>{data.auricular}</td>
<td>{data.versionSip}</td>
<td>{data.correo}</td>
<td>{data.anexo}</td>
<td><div className="separacion">
<button 
className="btn btn-danger ml-1 mr-1"
onClick={ ()=>handleDelete(data.id) }
> Borrar </button>
<button 
onClick={()=>handleToggle(data.id)}
className="btn btn-success">Editar</button>

</div></td>

</tr>
 
)))
      

       
    
  }
    
  
  </tbody>



</table>




</div>

</div>



        </div>
    )
}
