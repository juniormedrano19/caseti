import React from 'react'

export const TaskListItem = ({task, i, handleDelete, handleToggle}) => {
    return (
        <li 
        key={task.id}
        className="list-group-item">
            <p 
            className={`${task.done&& 'complete'}`}
            onClick={ ()=>handleToggle(task.id)}
            >
            {i+1} . {task.description}
            </p>
            <button 
            title='Borrar'
            className="btn btn-deleteTasks"
            onClick={()=>handleDelete(task.id)}
            > <i class="fa-solid fa-trash"></i>
            </button>
        </li>
    )
}
