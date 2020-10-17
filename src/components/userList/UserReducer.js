import React from 'react'

export const UserReducer = (state=[],action) => {
   switch (action.type) {
       case 'add':
           return [action.payload, ...state];

           case 'delete':
            
            return state.filter(ticket => ticket.id !== action.payload);
   
       default:
           return state;
   }
}
