const router = require('express').Router()
const Peliculas = require('../models/peliculasModel')


class APIfeactures {
    constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
    }
    filtering(){
      const queryObj = {...this.queryString} // queryString = req.query

      const excludedFields = ['page', 'sort', 'limit']
      excludedFields.forEach(el => delete(queryObj[el]))

      let queryStr = JSON.stringify(queryObj)
      console.log(queryStr)
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match)
      
      // gte = mayor o igual 
      // lte = menor o igual 
      // lt = menor que 
      // gt = mayot que 
      this.query.find(JSON.parse(queryStr))

      return this;
    }
    sorting(){
      if(this.queryString.sort){
        //sort = ordenar1
        const sortBy = this.queryString.sort.split(",").join("");
        console.log('sort', sortBy)
        this.query = this.query.sort(sortBy)
      }else{
        this.query = this.query.sort("-createdAt")
      }
      return this;
    }

    pagination(){
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this
    }
  }


router.get('/peliculas', async (req, res) => {
    try {
        const feactiures = new APIfeactures(Peliculas.find(), req.query)
        .filtering()
        .sorting() 
        .pagination()
        const peliculas = await feactiures.query
  
        res.json({
          status: "success",
          result: peliculas.length,
          peliculas: peliculas
        });
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
    })

    router.post('/peliculas', async (req, res) => {
    try {
     
        const {title, description, images, category, trailer, duracion} = req.body
        console.log(title, description, images, category, trailer, duracion)
        if(!images) return res.status(400).json({msg: "sin carga de imagen"})
  
        const newPeliculas = new Peliculas({
          producto_id: new Date().getTime(), 
          title: title.toLowerCase(), 
          description, 
          trailer, 
          images, 
          category,
          duracion
        })
        await newPeliculas.save()
        res.json({msg: "Peliculas nueva creada!"})
  
      } catch (err) {
        return res.status(500).json({ msg: err.message })
      }
})



// router.route('/peliculas/:id')
//     .delete(peliculasCtrl.deleteProducts)
//     .put(peliculasCtrl.updateProducts)


module.exports = router