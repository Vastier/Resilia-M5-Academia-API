import express from "express";
import indexController from "./controllers/index-controller.js";
import usuariosController from './controllers/usuarios-controller.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

indexController(app)

usuariosController(app)




export default app