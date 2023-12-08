/*
--EQUIPO
- Lilia Soto Llamas 20460040
- Max Yahir Rodríguez González 20460278
- Ramses Patiño Cortés 20460181
*/


import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './paginas/Home';
import Libros from './paginas/Libros';
import Autores from './paginas/Autores';
import NotFound from './paginas/Notfound';
import Temas from './paginas/Temas';
import Navbar from './componentes/Navbar';
import AgregarLibro from './componentes/AgregarLibro';
import AgregarTema from './componentes/AgregarTema'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Navbar element={<Navbar/>}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/libros' element={<Libros/>}/>
        <Route path='/autores' element={<Autores/>}/>
        <Route path='/temas' element={<Temas/>}/>
        <Route path='/agregartema' element={<AgregarTema/>}/>
        <Route path='/agregarlibro' element={<AgregarLibro/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
