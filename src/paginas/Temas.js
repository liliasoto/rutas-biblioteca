import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import '../estilos-de-css/Temas.css';

function Temas(){
  const [arrayTemas, setArrayTemas] = useState([]);
  const [estadoPeticion, setEstadoPeticion] = useState(null);

  useEffect(()=>{
    const obtenerTemas = async () => {
      try {
        const url = 'http://localhost/temas';
        //const url = 'http://localhost/phpmyadmin/index.php?route=/sql&db=biblioteca&table=temas';
        const response = await axios.get(url);
        setArrayTemas(response.data);
      } catch (error) {
        setEstadoPeticion(error);
      }
    };

    obtenerTemas();
  }, []);


  return(
    <div className="contenedor_tabla">
      <div className="temas">
        <h1>Gestión de Temas</h1>
        <table className="tabla_temas">
          <thead>
            <tr>
              <th>Temas</th>
            </tr>
          </thead>
          <tbody>
            {
              arrayTemas.map((tema)=>{
                return(
                  <tr key={tema.id_tema}>
                    <td>{tema.nombre}</td>
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

export default Temas;