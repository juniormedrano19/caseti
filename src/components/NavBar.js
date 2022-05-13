import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemesForm } from './ThemesForm';


export const NavBar = () => {

  const {user} = useContext(ThemesForm)
  const { newUserLower, password} = user


    return (
        <nav className="navbar-principal">
{/*   <Link to="/" className="navbar-brand" >Home</Link> */}

  <div >
    <div className=" contenedor navbar-nav ">
    <Link to="/" className='enlace-nav active'  >Home</Link>
 {/*      <NavLink exact activeClassName="active" to="/" className="nav-item nav-link">Regístrate</NavLink>
      <NavLink exact activeClassName="active" to="/login" className="nav-item nav-link">Login</NavLink> */}
      <NavLink exact activeClassName="active" to="/inventory" className='enlace-nav'  >Inventario</NavLink>
      <NavLink exact activeClassName="active" to="/ticket" className='enlace-nav' >Formulario de Tickets</NavLink>
      <NavLink exact activeClassName="active" to="/todo" className='enlace-nav' >Tareas</NavLink>
      <NavLink exact activeClassName="active" to="/users" className='enlace-nav' >Usuarios</NavLink>
      <NavLink exact activeClassName="active" to="/cdr" className='enlace-nav' >Work in CDRs</NavLink>
    </div>
  </div>
  {/* <form className="form-inline">

  <button className="btn btn-info">Dark</button>
  <a className="nav-item nav-link" href="#">{newUserLower}</a>
  </form> */}
</nav>
    )
}
