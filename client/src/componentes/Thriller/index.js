import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { GlobalState } from "../../context/GlobalState";

export const Thriller= () => {
const state = useContext(GlobalState)
const params = useParams()
const [peliculas] = state.peliculasAPI.pelicula
const [url, setUrl] = useState('')

useEffect(() => {
  peliculas.forEach(thriller => {
    if(thriller.producto_id === params.id) setUrl(thriller)
  })
},[])

  return (
    <div>
      <iframe width="560" height="315" src={url.trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  )
}
