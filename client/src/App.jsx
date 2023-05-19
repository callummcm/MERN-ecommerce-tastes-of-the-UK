import './App.css'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Menu from './components/nav/Menu'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
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
					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='' element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
