/*
--EQUIPO
- Lilia Soto Llamas 20460040
- Max Yahir Rodríguez González 20460278
- Ramses Patiño Cortés 20460181
*/

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../estilos-de-css/Libros.css';

function Libros(){
  const [arrayLibros, setArrayLibros] = useState([]);
  const [estadoPeticion, setEstadoPeticion] = useState(null);

  useEffect(()=>{
    const obtenerLibros = async () => {
      try {
        const url = 'http://localhost/libros';
        const response = await axios.get(url);
        setArrayLibros(response.data);
      } catch (error) {
        setEstadoPeticion(error);
      }
    };

    obtenerLibros();
  }, []);

  return(
    <div className="contenedor">
      <div className="libros">
        <h1>Libros</h1>
        <table className="tabla_libros">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Edición</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Tema</th>
            </tr>
          </thead>
          <tbody>
            {
              arrayLibros.map((libro)=>{
                return(
                  <tr key={libro.id_libro}>
                    <td>{libro.titulo}</td>
                    <td>{libro.edicion}</td>
                    <td>{libro.nombre_autor}{" "}{libro.apellido_autor}</td>
                    <td>{libro.nombre_editorial}</td>
                    <td>{libro.nombre_tema}</td>
                  </tr> 
                )
              })
            }
          </tbody>
        </table>
        {estadoPeticion && <div className="ep">{estadoPeticion.message}</div>}
      </div>
    </div>
  );
}

export default Libros;