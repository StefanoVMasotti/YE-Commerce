import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModels from '../models/UserModels.js'
import { registerSchema } from '../schemas/authSchema.js'

export const registerUser = async (req, res) => {
    try {
        // Traemos la clave de JWT del archivo .env
        const JWT_SECRET = process.env.JWT_SECRET

        // Extraer los datos del usuario del cuerpo de la solicitud
        const { email, password, username } = registerSchema.parse(req.body)

        // Comprobar si ya existe un usuario
        const existingUser = await UserModels.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario ya existe' })
        }

        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        // Comprobar el usuario Admin
        const isFirstUser = (await UserModels.countDocuments()) === 0

        // Crear usuario y guardar en la base de datos
        const newUser = await UserModels.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isFirstUser, // El primer usuario registrado será admin
        })

        // Generar un token con JWT
        //payload es la información que queremos incluir en el token, como el ID del usuario y si es admin
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
            expiresIn: '1h',
        })

        // header.payload.signature

        //Enviar el token como una cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true en producción, false en desarrollo
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // o 'strict' dependiendo de tus necesidades
            maxAge: 60 * 60 * 1000, // 1 hora
        })
            .status(201) // 201 Created
            .json({ message: 'Usuario registrado exitosamente' })
    } catch (error) {
        res.json({ error })
    }
}

export const profile = async (req, res) => {
    // Esxtraer el token enviado por el cliente
    const token = req.cookies.accessToken
    try {
        //Verificar o decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Buscar el usuario en la base de datos
        const user = await UserModels.findById(decoded.userId)

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        console.log('Usuario encontrado con exito y enviando al front datos')

        res.status(200).json({
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username,
        })
    } catch (error) {}
    return {
        user: 'Perfil del usuario',
    }
}
