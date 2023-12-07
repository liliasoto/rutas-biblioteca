import React from "react";
import { NavLink } from "react-router-dom";
import '../estilos-de-css/Navbar.css'


export default function Navbar(){
    return(
        <nav>
            <div><NavLink to='/'>Inicio</NavLink></div>
            <div><NavLink to='/autores'>Autores</NavLink></div>
            <div><NavLink to='/temas'>Temas</NavLink></div>
            <div><NavLink to='/agregartema'>Agregar Tema</NavLink></div>
            <div><NavLink to='/libros'>Libros</NavLink></div>
            <div><NavLink to='/agregarlibro'>Agregar Libro</NavLink></div>
        </nav>
    )
}