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
            className="btn btn-danger"
            onClick={()=>handleDelete(task.id)}
            > Borrar 
            </button>
        </li>
    )
}
