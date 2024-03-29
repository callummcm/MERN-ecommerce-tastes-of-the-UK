import {useState, createContext, useContext, useEffect} from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
	})

	// axios config
	axios.defaults.baseURL = import.meta.env.VITE_API
	axios.defaults.headers.common['authorization'] = auth?.token

	useEffect(() => {
		const data = localStorage.getItem('auth')

		if (data) {
			const parsedData = JSON.parse(data)
			setAuth({...auth, user: parsedData.user, token: parsedData.token})
		}
	}, [])

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	)
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}
