import { createContext, useContext, useState } from 'react'
import { loginUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem('token'),
    )

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user')

        return storedUser ? JSON.parse(storedUser) : null
    })

    async function login(email, password) {
        const data = await loginUser({
            email,
            password,
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        setToken(data.token)
        setUser(data.user)

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