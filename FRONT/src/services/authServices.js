import axios from 'axios'

// Configuracion base de axios para autenticacion
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// Http://localhost:3001/api/auth/register
// Http://localhost:3001/api/auth/profile

// Para incluir la Cookies en las peticiones
axios.defaults.withCredentials = true

export const getProfileService = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`)
        console.log('Response a /profile:', response)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener el perfil')
    }
}
export const loginService = async () => {}
export const registerService = async (
    data,
    reset,
    setRedirect,
    checkSession,
) => {
    try {
        console.log(API_URL)

        const response = await axios.post(`${API_URL}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        })

        console.log('Respuesta', response)

        if (response.status === 201 || response.status === 200) {
            alert('Registro exitoso')
            // Verificar la sesión real del servidor después del registro
            await checkSession()
            reset() // Limpiar el formulario
            setRedirect(true) // Indicar que se debe redirigir
        }
    } catch (error) {
        alert('Error al registrar el usuario')
    }
}
export const logoutService = async () => {}
