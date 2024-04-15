import { Router } from 'express'
import { getImagenes, saveImagenes, updateImagenes, deleteImagen} from '../Controllers/imagenesController.js'
import { subirImagen } from '../Middleware/Storage.js'
const rutas  = Router()

rutas.get('/api/imagenes', getImagenes)
rutas.get('/api/imagenes/:id', getImagenes)
rutas.post('/api/imagenes',subirImagen.single('imagen'), saveImagenes)
rutas.put('/api/imagenes/:id',subirImagen.single('imagen'),updateImagenes)
rutas.delete('/api/imagenes/:id',deleteImagen)


export default rutas