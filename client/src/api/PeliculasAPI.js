import {useState, useEffect} from 'react'
import axios from 'axios'

function PeliculasAPI() {
	const [peliculas, setPeliculas] = useState([])
	const [callback, setCallback] = useState(false)
	const [category, setCategory] = useState('')
	const [sort, setSort] = useState('')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [result, setResult] = useState(0)


	useEffect(() => {
		(async () => {
		  const res = await axios.get(`/api/peliculas?limit=${page*100}&${category}&${sort}&title[regex]=${search}`)
		  setPeliculas(res.data.peliculas)
		  setResult(res.data.result)
		})();
			
		}, [callback, category, sort, search, page])

		console.log(peliculas)

	return {
		pelicula: [peliculas, setPeliculas],
		callback: [callback, setCallback],
		category: [category, setCategory],
		sort: [sort, setSort],
		search: [search, setSearch],
		page: [page, setPage],
		result: [result, setResult]
	}
}

export default PeliculasAPI
