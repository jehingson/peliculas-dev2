import {useState, useEffect} from 'react'
import axios from 'axios'

function CategoryAPI() {
  const [category, setCategory] = useState([])
  const [callbackdos, setCallbackdos] = useState(false)


  useEffect(()=>{
    (async () => {
      const res = await axios.get('/api/category')
      setCategory(res.data)
    })();
   
  },[callbackdos])

  return {
    categorys: [category, setCategory],
    callbackdos: [callbackdos, setCallbackdos]
  }
}

export default CategoryAPI
