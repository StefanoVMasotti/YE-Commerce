import axios from 'axios'

// Configuracion base de axios para autenticacion
const API_URL = import.meta.env.VITE_BACKEND_URL + '/auth'
// Http://localhost:3001/api/auth/register

// Para incluir la Cookies en las peticiones
axios.defaults.withCredentials = true

export const getProfileService = async () => {}
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
            reset() // Limpiar el formulario
        }
    } catch (error) {
        alert('Error al registrar el usuario')
    }
}
export const logoutService = async () => {}
