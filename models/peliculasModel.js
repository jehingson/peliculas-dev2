const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    producto_id: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    trailer: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})  

module.exports = mongoose.model("peliculas", productoSchema)