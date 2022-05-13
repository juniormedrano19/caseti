import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
 
  } from "react-router-dom";
import { Inventario } from '../components/Inventario';


import { Login } from '../components/Login';
import { NavBar } from '../components/NavBar';
import { FormPrincipal } from '../FormPrincipal';
import { FormTicket } from '../components/FormTicket';
import {TaskApp} from '../components/tasks/TaskApp';
import {UserApp} from '../components/userList/UserApp';
import {ExcelApp} from '../components/excelCdr/ExcelApp'
import { LoginScreen } from '../auth/LoginScreen';



export const RouterApp = () => {

    
   
/* 
    const Routes=[{
        exact:true,
        path:'/register',
        component:FormPrincipal,
    },{
        exact:true,
        path:'/login',
        component:Login,
    }]
 */





    return (
    <Router>
        <div>
        <NavBar />
            <Switch>
        
               <Route  exact path="/" component={ FormPrincipal }/>
               <Route  exact path="/login" component={ Login }/>
               <Route  exact path="/inventory" component={ Inventario }/>
               <Route  exact path="/ticket" component={ FormTicket }/>
               <Route  exact path="/todo" component={ TaskApp }/>
               <Route  exact path="/users" component={ UserApp }/>
               <Route  exact path="/cdr" component={ ExcelApp }/>
      
               <Redirect to="/"/>
            </Switch>
        </div>
    </Router>
    )
}
