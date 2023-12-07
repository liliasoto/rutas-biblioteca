import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../estilos-de-css/Autores.css?1.0';

function Autores(){
  const [arrayAutores, setArrayAutores] = useState([]);
  const [estadoPeticion, setEstadoPeticion] = useState(null);

  useEffect(()=>{
    const obtenerAutores = async () => {
      try {
        const url = 'http://localhost/autores';
        const response = await axios.get(url);
        setArrayAutores(response.data);
      } catch (error) {
        setEstadoPeticion(error);
      }
    };

    obtenerAutores();
  }, []);


  return(
    <div className="contenedor_t">
      <div className="autores">
        <h1>Autores</h1>
        <table className="tabla_autores">
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {
              arrayAutores.map((autor)=>{
                return(
                  <tr key={autor.id_autor}>
                    <td>{autor.nombre}{" "}{autor.apellidos}</td>
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

export default Autores;