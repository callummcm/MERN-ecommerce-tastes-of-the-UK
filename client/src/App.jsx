import './App.css'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/nav/Menu'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Toaster />
				<Menu />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
