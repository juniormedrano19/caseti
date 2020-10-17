import React, { useState } from 'react'
import { ThemesForm } from './components/ThemesForm'
import { RouterApp } from './routes/RouterApp'


export const Main = () => {

    const [user, setUser] = useState({});



    return (
    <ThemesForm.Provider value={{ user, setUser } }>
       <RouterApp />
       </ThemesForm.Provider>
    )
}
