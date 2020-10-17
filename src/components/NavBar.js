import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemesForm } from './ThemesForm';


export const NavBar = () => {

  const {user} = useContext(ThemesForm)
  const { newUserLower, password} = user


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <Link to="/" className="navbar-brand" >Home</Link>

  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink exact activeClassName="active" to="/" className="nav-item nav-link">Regístrate</NavLink>
      <NavLink exact activeClassName="active" to="/login" className="nav-item nav-link">Login</NavLink>
      <NavLink exact activeClassName="active" to="/inventory" className="nav-item nav-link" >Inventario</NavLink>
      <NavLink exact activeClassName="active" to="/ticket" className="nav-item nav-link" >Formulario de Tickets</NavLink>
      <NavLink exact activeClassName="active" to="/todo" className="nav-item nav-link" >Tareas</NavLink>
      <NavLink exact activeClassName="active" to="/users" className="nav-item nav-link" >Usuarios</NavLink>
      <NavLink exact activeClassName="active" to="/cdr" className="nav-item nav-link" >Work in CDRs</NavLink>
    </div>
  </div>
  <form className="form-inline">

  <button className="btn btn-info">Dark</button>
  <a className="nav-item nav-link" href="#">{newUserLower}</a>
  </form>
</nav>
    )
}
