import {
    createContext,
    useContext,
    useState,
} from 'react'
import {
    loginUser,
    registerUser,
} from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem('token'),
    )

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')

        return storedUser
            ? JSON.parse(storedUser)
            : null
    })

    function saveSession(data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem(
            'user',
            JSON.stringify(data.user),
        )

        setToken(data.token)
        setUser(data.user)
    }

    async function login(email, password) {
        const data = await loginUser({
            email,
            password,
        })

        saveSession(data)

        return data
    }

    async function register(name, email, password) {
        const data = await registerUser({
            name,
            email,
            password,
        })

        saveSession(data)

        return data
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        setToken(null)
        setUser(null)
    }

    const value = {
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}