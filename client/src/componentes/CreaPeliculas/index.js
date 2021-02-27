import React, { useState, useContext } from 'react'
import axios from "axios";
import Loading from "../loading/Loading";
import { GlobalState } from "../../context/GlobalState";
import {useHistory} from 'react-router-dom'
import './styles.css'



const initialState = {
  title: '',
  description: '',
  duracion: 0,
  category: '',
  trailer: '',
  extreno: '',
}

export const CreaPeliculas = () => {
  const history = useHistory()
  const state = useContext(GlobalState)
  const [category] = state.categoryAPI.categorys
  const [callback, setCallback] = state.peliculasAPI.callback
  const [images, setImages] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pelicula, setPelicula] = useState(initialState)

  

const hendleUpload = async (e) => {
  e.preventDefault()
  try{
    
    const file = e.target.files[0]
    console.log(file)
    if(!file) return alert("Archivo no evistente")

    if(file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('El formato del archivo es incorrecto!')

    let formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    const res = await axios.post('/api/subir', formData, {
      header: {'content-type': 'multipart/form-data'}
    })
    setLoading(false)
    setImages(res.data)

  }catch(error){
    alert(error.response.data.msg)
    setLoading(false)
  }
}

const handleChange = (e) => {
  const {name, value} = e.target
  setPelicula({...pelicula, [name]:value})
}

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log(pelicula)
  try{
    if(!images) return alert('No hay Carátula subida')
    await axios.post('/api/peliculas',{...pelicula, images})
    setCallback(!callback)
    history.push('/')
  }catch(error){
    alert(error.response.data.msg)
  }
}



  return (
    <div className="crear-pelicula">
      <h1>Crear Peliculas</h1>
        <div>
          <input type="file" name="file" id="file-up" onChange={hendleUpload} />
        </div>
        {
          loading ? <div className="loagin"><Loading /></div> 
          : <>{images ? <img src={images.url}/> : '' } </>
          
        }
      <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="title">Titulo</label>
            <input 
              type="text"
              name="title"
              required
              value={pelicula.title}
              onChange={handleChange}
              />
          </div>
          <div className="row">
            <label htmlFor="description">Descripción</label>
            <textarea 
              type="text"
              name="description"
              required
              value={pelicula.description}
              onChange={handleChange}
              />
          </div>
          <div className="row">
            <label htmlFor="duracion">Duración</label>
            <input 
              type="number"
              name="duracion"
              value={pelicula.duracion}
              onChange={handleChange}
              />
          </div>

          <div className="row">
            <label htmlFor="category">Categorias:</label>
            <select name="category" value={pelicula.category} onChange={handleChange}>
            <option value="">Categoria</option>
            {
              category.map(cat => (
                
                <option value={cat._id} key={cat._id}>
                    {cat.name}
                </option>
              ))
            }
            </select>
          </div>
          <div className="row">
            <label htmlFor="traile">Extreno</label>
            <input 
              type="text"
              name="extreno"
              required
              value={pelicula.extreno}
              onChange={handleChange}
              />
          </div>

          <div className="row">
            <label htmlFor="traile">Trailer url</label>
            <input 
              type="text"
              name="trailer"
              required
              value={pelicula.trailer}
              onChange={handleChange}
              />
          </div>

          <button type="submit">Crear nueva pelicula</button>
      </form>
    </div>
  )
}
