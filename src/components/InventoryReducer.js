

export const InventoryReducer = (state=[], action) => {
   
    switch (action.type) {
        case 'add':
          return [action.payload,...state];

        case 'delete':
          return state.filter(data=>(data.id)!== action.payload);

          case 'toggle':
            return state.map(todo=>
                ( todo.id===action.payload)
                ? {...todo, done:!todo.done}: todo
        
            )
        
    
        default:
           return state;
    }

}
