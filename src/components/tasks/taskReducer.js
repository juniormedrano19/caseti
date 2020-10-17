

export const taskReducer = ( state=[], action) => {

    switch (action.type) {
        case 'add':
            return [...state, action.payload];
        case 'delete':
            return state.filter(task=>task.id!==action.payload); // creación de un nuevo arreglo con estas condiciones
    
            case 'toggle':
               return state.map(task=>(task.id===action.payload)?{...task, done:!task.done}: task)

            /*    return state.map((task)=>{
                if(task.id===action.payload){
                    return{
                        ...task,
                        done:!task.done,
                
                    }
                }else{
                    return task
                }
                
            }) */


        default:
            return state;
    }
   
}
