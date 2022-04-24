import express from "express";
import indexController from "./controllers/index-controller.js";
import usuariosController from './controllers/usuarios-controller.js'
import db from './database/sqlite-db.js';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

indexController(app)

usuariosController(app, db)

export default app