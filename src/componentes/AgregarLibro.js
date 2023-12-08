import React from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useEffect} from "react";
import Modal from 'react-modal';
import '../estilos-de-css/AgregarLibro.css'

Modal.setAppElement('#root');

export default function AgregarLibro(){

  const [isLoading, setLoading] = useState(false); //Mensaje enviado
  const [isError, setIsError] = useState(false); 
  const [autores, setAutores] = useState([]);
  const [editorial, setEditorial] = useState([]);
  const [tema, setTema] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {register, handleSubmit, setValue,
          formState:{errors}, reset
        } = useForm();

  useEffect(() => {
    axios.get("http://localhost/autores").then((res) => {
    setAutores(res.data); 
    });
    axios.get("http://localhost/editoriales").then((res) => {
    setEditorial(res.data); 
    });
    axios.get("http://localhost/temas").then((res) => {
    setTema(res.data);
    });
  }, []);

  const onSubmit = handleSubmit(
    (data)=>{
      console.log(data);
      setLoading(true);
      setIsError(false);
      // Modifica la estructura del objeto data antes de enviarlo
      const modifiedData = {
        titulo: data.titulo,
        edicion: data.edicion,
        fk_id_autor: data.fk_id_autor,
        fk_id_editorial: data.fk_id_editorial,
        fk_id_tema: data.fk_id_tema,
      };
      axios.post("http://localhost/libros", modifiedData).then(res => {
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
    <div className="contenedor_li">
      <div className="formm"> 
      <h1>Agregar libro</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="titulo">Titulo</label>
        <br></br>
        <input 
          type="text"
          {...register('titulo', {
            required:true
          })}/>

          {errors.titulo && <span>El titulo es requerido</span>}
        <br></br>
        <label className="lab" htmlFor="edicion">Edicion</label>
        
        <input 
          type="text"
          {...register('edicion', {
            required:true
          })}/>

          {errors.edicion && <span>La edicion es requerida</span>}
        <br></br>
        <label className="lab" htmlFor="fk_id_autor">Autor</label>
        
        <select
          onChange={(e) => setValue("fk_id_autor", e.target.value)}
          {...register("fk_id_autor", {
            required: true,
          })}
        >
          <option value="">Selecciona un autor</option>
          {autores.map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nombre}{" "}{autor.apellidos}
            </option>
          ))}
        </select>

          {errors.fk_id_autor && <span>El autor es requerido</span>}
        <br></br>
        <label className="lab" htmlFor="fk_id_editorial">Editorial</label>
        
        <select
          onChange={(e) => setValue("fk_id_editorial", e.target.value)}
          {...register("fk_id_editorial", {
            required: true,
          })}
        >
          <option value="">Selecciona una editorial</option>
          {editorial.map((editorial) => (
            <option key={editorial.id} value={editorial.id}>
              {editorial.nombre}
            </option>
          ))}
        </select>

          {errors.fk_id_tema && <span>La editorial es requerida</span>}

        {isError && <span>Algo salió mal. Por favor, intentélo de nuevo más tarde</span>}

        <br></br>
        <label className="lab" htmlFor="fk_id_tema">Tema</label>
        
        <select
          onChange={(e) => setValue("fk_id_tema", e.target.value)}
          {...register("fk_id_tema", {
            required: true,
          })}
        >
          <option value="">Selecciona un tema</option>
          {tema.map((tema) => (
            <option key={tema.id} value={tema.id}>
              {tema.nombre}
            </option>
          ))}
        </select>

          {errors.fk_id_tema && <span>El tema es requerido</span>}

        {isError && <span>Algo salió mal. Por favor, intentélo de nuevo más tarde</span>}

        <br></br>
        <br></br>
        <button 
          type="submit"
          disabled={isLoading}>
          {isLoading ? 'Enviando...': 'Enviar'}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Libro guardado"
          style={{
            content: {
              width: '260px', 
              height: '100px',
              margin: 'auto',
              borderRadius: '10px', 
              padding: '20px',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <div>
            <p>¡El libro se guardó con éxito!</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </Modal>
      </form>
      </div>
    </div>
  )
}