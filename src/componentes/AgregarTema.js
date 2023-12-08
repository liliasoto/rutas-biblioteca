/*
--EQUIPO
- Lilia Soto Llamas 20460040
- Max Yahir Rodríguez González 20460278
- Ramses Patiño Cortés 20460181
*/

import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import '../estilos-de-css/AgregarTemas.css?1.0'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function AgregarTema(){


  const [isLoading, setLoading] = useState(false); //Mensaje enviado
  const [isError, setIsError] = useState(false); 
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {register, handleSubmit, 
          formState:{errors}, reset 
        } = useForm();

  const onSubmit = handleSubmit(
    (data)=>{
      console.log(data);
      setLoading(true);
      setIsError(false);

      if (!data.nombre) {
        // Evitar enviar la solicitud si el campo nombre está vacío
        setLoading(false);
        return;
      }

      axios.post("http://localhost/temas", data).then(res => {
        console.log(res);
        setLoading(false);
        reset();
        setModalIsOpen(true); 
      }).catch(err =>{
        setLoading(false);
        setIsError(true);
      })
    }
  );

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return(
    <div className="contenedor_tabla">
      <div className="formm"> 
      <h1>Agregar tema</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Tema</label><br></br>
        <input 
          type="text"
          {...register('nombre', {
            required:true
          })}/><br></br>

          {errors.nombre && <span>El nombre es requerido</span>}

        {isError && <span>Algo salió mal. Por favor, intentélo de nuevo más tarde</span>}
        <br></br>
        <button 
          type="submit"
          disabled={isLoading}>
          {isLoading ? 'Enviando...': 'Enviar'}
        </button>
        <Modal
          isOpen={modalIsOpen && !isError}
          onRequestClose={closeModal}
          contentLabel="Tema guardado"
          style={{
            content: {
              width: '260px',
              height: '100px',
              margin: 'auto', // Centra el modal horizontalmente
              borderRadius: '10px', // Bordes redondeados
              padding: '20px', // Relleno interno
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
            },
          }}
        >
          <div>
            <p>¡El tema se guardó con éxito!</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </Modal>
      </form>
      </div>
    </div>
  )
}