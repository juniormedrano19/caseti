import React from 'react'

export const ExcelReducer = (state=[], action) => {

    switch (action.type) {
        case 'add':
            
            return [action.payload, ...state];
            case 'delete':
            
                return state.filter(ticket => ticket.id !== action.payload);
            case 'toggle':
                return state.map(todo=>
                    ( todo.id===action.payload)
                    ? {...todo, edit:!todo.edit}: todo
            
                )
    
        default:
            return state;
    }
    
}
