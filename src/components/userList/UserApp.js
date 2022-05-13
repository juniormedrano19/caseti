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
        <div className='contenedorXlsx'>

<div className="cabecera-tickets contenedorXlsx">
        <div className="title-excel">
        <h1>Lista de usuarios </h1>
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
                filename="Lista_Usuario"
                sheet="Usuarios"
                buttonText="Descargar Excel"

                
            />
           </div>
    </div>
        
        </div>

  
       
           




        <div className='modulos-listaUsers'>
        <div className="add-users">
            <div >
                <form 
                onSubmit={handleSubmit}
                className="formulario-usuarios">
                    <div className='campo-users'>
                    <label htmlFor="user" >Usuario(*) </label>
                    <input
                    type="text"
                    id="user"
                   
                    name="user"
                    autoComplete="off"
                    placeholder="Usuario de cobtel"
                    value={user}
                    onChange={handleInputChange}

                    />
                    </div>
               
                    <div className='campo-users'>
                    <label htmlFor="name">Nombres y Apellidos(*) </label>
                    <input
                    type="text"
                    id="name"
                   
                    name="name"
                    autoComplete="off"
                    placeholder="Nombres y Apellidos"
                    value={name}
                    onChange={handleInputChange}

                    />
                    </div>
                    <div className='campo-users'>
                    <label htmlFor="country">Pais</label>
                    <select 
                    id="country" 
                   className='select-users'
                    name="country"
                    value={country}
                    onChange={handleInputChange}
                    >
                    <option defaultValue>...</option>
                    <option>Peru</option>
                    </select>
                    </div>


                    <div className='campo-users'>
                    <label htmlFor="cargo">Cargo</label>
                    <select 
                    id="cargo" 
                    className='select-users'
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
                    </div>



                    <div className='campo-users'>
                    <label htmlFor="cedente">Cedente(*) </label>
                    <input
                    type="text"
                    id="cedente"
                  
                    name="cedente"
                    autoComplete="off"
                    placeholder="Cedente"
                    value={cedente}
                    onChange={handleInputChange}

                    /> 
                        
                        </div>                  


                        <div className='campo-users'>
                        <label htmlFor="empresa">Empresa(*) </label>
                        <input
                        type="text"
                        id="empresa"
                    
                        name="empresa"
                        autoComplete="off"
                        placeholder="Empresa"
                        value={empresa}
                        onChange={handleInputChange}

                        />

                        </div>


                        <div className='campo-users'>
                        <label htmlFor="extension">Extensión(*) </label>
                        <input
                        type="text"
                        id="extension"
                   
                        name="extension"
                        autoComplete="off"
                        placeholder="Extensión"
                        value={extension}
                        onChange={handleInputChange}

                        />
                        </div>


                        <div className='campo-users'>
                        <label htmlFor="hostname">Hostname(*) </label>
                        <input
                        type="text"
                        id="hostname"
                     
                        name="hostname"
                        autoComplete="off"
                        placeholder="Hostname"
                        value={hostname}
                        onChange={handleInputChange}

                        />
                        </div>



<button 
type="submit"
className=" btn btn-addUsers "
>Agregar al histórico</button>


                  
                </form>
            </div>
            
        </div>






        <div className="table-users ">
            <div className="table-mainUsers">
            <table 
className="table table-usersRight"
id="tablaInventario"
>

<thead className='thead-users'>
    <tr className='encabezado-tableUsers'>
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
className="btn btn-deleteTicket"
title='Eliminar'
onClick={ ()=>handleDelete(data.id) }
> <i class="fa-solid fa-trash"></i> </button>
<button 

title="Editar"
className="btn btn-EditTicket"><i class="fa-solid fa-pen-to-square"></i></button>
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
className="btn btn-deleteTicket"
title='Eliminar'
onClick={ ()=>handleDelete(data.id) }
> <i class="fa-solid fa-trash"></i> </button>
<button 

title="Editar"
className="btn btn-EditTicket"><i class="fa-solid fa-pen-to-square"></i></button>
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
        </div>
    )
}
