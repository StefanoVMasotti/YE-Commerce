import { connectDB, disconnectDB } from './config/configdb.js'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

const PORT = 3001

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // Cambia esto por el origen de tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cookie',
            'Set-Cookie',
        ],
        credentials: true, // Permite enviar cookies en solicitudes CORS
    })
)
app.use(cookieParser())
app.use(express.json())

// Rutas API
app.use('/api/auth', authRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando en puerto ${PORT}`)
        })
    })
    .catch((error) => {
        disconnectDB()
    })
