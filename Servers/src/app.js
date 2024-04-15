import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import rutasImagenes from './Routes/imagenes.routes.js'

import {DB_HOST, DB_DATABASE, DB_PORT} from './config.js'

const conexion = 'mongodb://'+DB_HOST+':'+DB_PORT+'/'+DB_DATABASE
mongoose.connect(conexion).then()

const app =  express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('public'))
app.use(rutasImagenes)
//app.get('/', (req,res) => {res.send('hola mundo')})

app.use ((req,res) =>{
    res.status(404).json({status:false, errors:'Not found'})
})

export default app