import React, {useReducer, useEffect} from 'react';
import { useForm } from '../../hooks/useForm';
import {UserReducer} from './UserReducer';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { v4 as uuid_v4 } from "uuid";


const init=()=>{
  return  JSON.parse(localStorage.getItem('usuariosCobtel')) || []
}

export const UserApp = () => {

    const  [valores, handleInputChange, reset] = useForm({
        id:'',
user:'',
name:'',
country:'',
cargo:'',
cedente:'',
empresa:'',
extension:'',
hostname:'',
edit:false,
    })

    const {id,user,name,country,cargo,cedente,empresa,extension,hostname,edit}=valores;





const [usuarios, dispatch] = useReducer(UserReducer, [], init)
useEffect(() => {
   
    localStorage.setItem('usuariosCobtel',JSON.stringify(usuarios))
}, [usuarios])

const handleSubmit=(e)=>{
    e.preventDefault();

if(name.trim().length <= 1 && extension.trim().length <=1 ){
    return;
}


    const newTicket={
        id:uuid_v4(),
      
        user,
        name,
        country,
        cargo,
        cedente,
        empresa,
        extension,
        hostname,
edit:false,
    }

/* if(month < 10){
  console.log(`${day}-0${month}-${year}`)
}else{
  console.log(`${day}-${month}-${year}`)
} */


const action={
    type:'add',
    payload:newTicket,
}

dispatch(action);

reset();

}

const handleDelete=(id)=>{
    dispatch({
        type:'delete',
        payload:id,
    })
}



const [search1,handleInputSearch,resetear]= useForm({
    search:''
})
const {search} = search1

/* console.log(search); */
 const dataStore=init();
 let res = dataStore.filter(o=>Object.values(o).toString().toLowerCase().includes(search)) 


init();












    return (
        <div>
  
        <div className="excel row">
        <div className="col-4">
        <h1>Lista de usuarios de Cobtel</h1>
        </div>
        <div className="col-4">
            <ReactHTMLTableToExcel 
                id="botonExportarExcel"
                className="btn btn-outline-success btn-block"
                table="tablaInventario"
                filename="Lista_Usuario"
                sheet="Usuarios"
                buttonText="Descargar Excel"

                
            />
           </div>
            <div className="col-4">
              <form 
              className="form-group expandir mt-3"
            
              >
           
<input
type="text"
id="search"
className="form-control mr-sm-2"
name="search"
autoComplete="off"
placeholder="Search"
value={search}
onChange={ handleInputSearch }


/>
 
    <button 
   
    className="btn btn-success my-2 my-sm-0" 
    type="submit">Search</button>
    </form>
    </div>
        
        </div>
            <hr />





        <div className="row">
            <div className="col-2 ml-3 detail">
                <form 
                onSubmit={handleSubmit}
                className="form-group">
                <label htmlFor="user" className="mt-3">Usuario(*) </label>
<input
type="text"
id="user"
className="form-control mb-4"
name="user"
autoComplete="off"
placeholder="Usuario de cobtel"
value={user}
onChange={handleInputChange}

/>

                   
<label htmlFor="name">Nombres y Apellidos(*) </label>
<input
type="text"
id="name"
className="form-control mb-4"
name="name"
autoComplete="off"
placeholder="Nombres y Apellidos"
value={name}
onChange={handleInputChange}

/>

<label htmlFor="country">Pais</label>
<select 
id="country" 
className="form-control mb-4"
name="country"
value={country}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>Peru</option>
</select>

<label htmlFor="cargo">Cargo</label>
<select 
id="cargo" 
className="form-control mb-4"
name="cargo"
value={cargo}
onChange={handleInputChange}
>
<option defaultValue>...</option>
<option>Cobrador Telefonico
</option>
<option>Supervisor Telefonico
</option>
</select>

                   
<label htmlFor="cedente">Cedente(*) </label>
<input
type="text"
id="cedente"
className="form-control mb-4"
name="cedente"
autoComplete="off"
placeholder="Cedente"
value={cedente}
onChange={handleInputChange}

/>

<label htmlFor="empresa">Empresa(*) </label>
<input
type="text"
id="empresa"
className="form-control mb-4"
name="empresa"
autoComplete="off"
placeholder="Empresa"
value={empresa}
onChange={handleInputChange}

/>



<label htmlFor="extension">Extensión(*) </label>
<input
type="text"
id="extension"
className="form-control mb-4"
name="extension"
autoComplete="off"
placeholder="Extensión"
value={extension}
onChange={handleInputChange}

/>


<label htmlFor="hostname">Hostname(*) </label>
<input
type="text"
id="hostname"
className="form-control mb-4"
name="hostname"
autoComplete="off"
placeholder="Hostname"
value={hostname}
onChange={handleInputChange}

/>


<button 
type="submit"
className=" btn btn-primary btn-block "
>Agregar al histórico</button>


                  
                </form>
            </div>
            <div className="col-9"></div>
        </div>
        <div className="row ">
            <div className="col-11 ml-5 mt-3">
            <table 
className="table table-bordered table-responsive-md text-center"
id="tablaInventario"
>

<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Usuario</th>
      <th scope="col">Nombres y Apellidos</th>
      <th scope="col">País</th>
      <th scope="col">Cargo</th>
      <th scope="col">Cedente</th>
      <th scope="col">Empresa</th>
      <th scope="col">Extensión</th>
      <th scope="col">Hostname</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
  {

(search.length>0)?( res.map((data,i)=>(

    <tr key={data.id} >


<th scope="row">{`${i+1}`}</th>
<td>{data.user}</td>
<td>{data.name}</td>
<td>{data.country}</td>
<td>{data.cargo}</td>
<td>{data.cedente}</td>
<td>{data.empresa}</td>
<td>{data.extension}</td>
<td>{data.hostname}</td>
<td>
<div className="separacion">
<button 
className="btn btn-danger ml-1 mr-1"
onClick={ ()=>handleDelete(data.id) }
> Borrar </button>
<button 

className="btn btn-success">Editar</button>
</div>
</td>

</tr>

))):( usuarios.map((data,i)=>(

    <tr key={data.id} >


<th scope="row">{`${i+1}`}</th>
<td>{data.user}</td>
<td>{data.name}</td>
<td>{data.country}</td>
<td>{data.cargo}</td>
<td>{data.cedente}</td>
<td>{data.empresa}</td>
<td>{data.extension}</td>
<td>{data.hostname}</td>
<td>
<div className="separacion">
<button 
className="btn btn-danger ml-1 mr-1"
onClick={ ()=>handleDelete(data.id) }
> Borrar </button>
<button 

className="btn btn-success">Editar</button>
</div>
</td>

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
