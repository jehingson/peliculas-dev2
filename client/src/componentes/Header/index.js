import React, { useContext } from 'react'
import './styles.css';
import { Link } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";

export const Header = () => {

  const state = useContext(GlobalState)
  const [search, setSearch] = state.peliculasAPI.search
  return (
    <ul className="header">
          <div className="buscar">
            <input 
              type="buscar" 
              placeholder="buscar peliculas"
              value={search}
              onChange={e => setSearch(e.target.value.toLowerCase())}
              />
          </div>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/crear-peliculas">Crear Pelicula</Link></li>
    </ul>
  )
}
