import { useState } from "react"



export const useForm = ( initialState = {} ) => {
  
const [ values, setValues ] = useState(initialState)


const reset=()=>{
    setValues(initialState);
}



const handleInputChange=({target})=>{
    setValues({
        ...values,
        [target.name]:target.value // target.name= name : value , para email sería target.name=email :value
    })
}

return [values, handleInputChange, reset];
}
