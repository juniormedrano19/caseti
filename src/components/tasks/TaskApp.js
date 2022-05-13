import React, { useEffect, useReducer } from 'react';
import './styles.css';
import { taskReducer } from './taskReducer';
import { TaskList } from './TaskList';
import { TaskAdd } from './TaskAdd';


/* const initialState=[{
    id:uuid_v4(),
    description: 'Generar backup en el NAS',
    done: false
    
}]
 */

 const init=()=>{
    /*  return [{
        id:uuid_v4(),
        description: 'Generar backup en el NAS',
        done: false
        
    }] */
    return JSON.parse(localStorage.getItem('tasks'))|| [];
 }



export const TaskApp = () => {

    
    const [tasks, dispatch] = useReducer(taskReducer, [], init)

  /*   console.log(tasks); */

useEffect(()=>{

    localStorage.setItem('tasks', JSON.stringify(tasks))

}, [tasks])


  const handleDelete=(taskId)=>{

    const action={
        type:'delete',
        payload:taskId,
    }

    dispatch(action)

  }

  const handleToggle=(taskId)=>{

    dispatch({
        type:'toggle',
        payload:taskId,
    })

  }

  const handleAddTask=(newTask)=>{
dispatch({
    type:'add',
    payload:newTask,
})
  }


  /*   const handleSubmit=(e)=>{
        e.preventDefault();

        if(description.trim().length<=1){
            return;
        }
        
        const newTask={
            id:uuid_v4(),
            description: description,
            done: false
        }

        const action={
            type:'add',
            payload:newTask,
        }
        dispatch(action);
    reset();
    }
 */


    return (

        <div className="contenedorXlsx">

        <h1 className='title-task'>Tareas a realizar ({tasks.length}) </h1>
   {/*      <hr /> */}

       <div className="title-mainTask">
           <div className="list-tasks">
         <TaskList 
            tasks={tasks}
            handleDelete={ handleDelete }
            handleToggle={ handleToggle }

         />

           </div>
           <div className="add-tasks">

            <TaskAdd  handleAddTask={ handleAddTask } />
               
           </div>
       </div>
            
        </div>
    )
}
