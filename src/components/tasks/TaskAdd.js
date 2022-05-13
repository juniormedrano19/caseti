import React from 'react'
import { useForm } from '../../hooks/useForm'
import { v4 as uuid_v4 } from "uuid";

export const TaskAdd = ({handleAddTask}) => {
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    
    // current year
    let year = date_ob.getFullYear();
    
    // prints date in YYYY-MM-DD format
    let diaActual=`${date}/${month}/${year}`
    let fecha=diaActual

    const  [{description}, handleInputChange, reset]= useForm({
        description:'',
    })

    const handleSubmit=(e)=>{
        e.preventDefault();


        if(description.trim().length<=1){
            return;
        }
        
        const newTask={
            id:uuid_v4(),
            description: description,
            done: false
        }

        handleAddTask(newTask);
        reset();

    }


    return (
        <div>
             <h4 className='agregar-title'>Agregar tareas -Día:<small> {fecha}</small></h4>
          {/*  <hr/> */}
           <form onSubmit={ handleSubmit }>
               <input
               type="text"
               name="description"
               className="input-addTasks"
               placeholder="Tareas a realizar ..."
               autoComplete="off"
               value={ description }
               onChange= { handleInputChange }
               />
               <button 
               className="btn btn-addTaks"
               type="submit"
               
               >Agregar</button>
           </form>
        </div>
    )
}
