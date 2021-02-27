import React, { useContext } from "react";
import "./styles.css";
import { GlobalState } from "../../context/GlobalState";
import { Link } from "react-router-dom";


export const Listas = () => {
  const state = useContext(GlobalState)
  const [category] = state.categoryAPI.categorys
  const [categori, setCategori] = state.peliculasAPI.category
  const [peliculas] = state.peliculasAPI.pelicula
 
  console.log(categori)
  return (
    <div className="listas-peliculas">
      <div className="flex">
          <div className="lista">
            <h2>Lista de peliculas</h2>

            <ul>
              <li onClick={() => setCategori("")} >Todas</li>
              {
                category.map(categoria => (
                  <li 
                  key={categoria._id}
                  onClick={() => setCategori("category=" + categoria._id)}
                  >
                    {categoria.name}
                    </li>
                ))
              }
            </ul>
          </div>
          <div className="peliculas">
            <div className="peliculas-grid">
              {
                peliculas && peliculas.map(pelicula => (
                <div className="peliculas-card" key={pelicula.producto_id}>
                <img
                  src={pelicula.images.url}
                  alt={pelicula.title}
                />

                <div className="text">
                  <h3>{pelicula.title}</h3>
                  <p>Duracion:{pelicula.duracion} min</p>
                  <p>Fecha de Estreno:</p>
                  <Link to={`/thriller/${pelicula.producto_id}`}>Thriller ver</Link>
                </div>
              </div>
                ))
              }
           
            </div>
          </div>
        </div>
    </div>
  );
};
