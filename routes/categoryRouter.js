const router = require('express').Router()
const Category = require('../models/categoryModel')


router.get('/category', async (req, res) => {
  try {
    const category = await Category.find()
    console.log(category)
    res.json(category)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})


router.post('/category', async (req, res) => {
  try {
    const { name } = req.body
    const category = await Category.findOne({name})

    if(category) return res.status(400).json({msg: "Esta categoria ya existe!"})

    const newCategoy = new Category({name}) 
    await newCategory.save()

    res.json({msg: "Categoria Creada con Exito..."})
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
})

 



module.exports = router