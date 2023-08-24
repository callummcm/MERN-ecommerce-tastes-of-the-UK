import './App.css'
import Home from './pages/Home'
import Navbar from './components/nav/Navbar'
import Dashboard from './pages/user/Dashboard'
import Shop from './pages/user/Shop'
import Search from './pages/user/Search'
import AdminDashboard from './pages/admin/Dashboard'
import PrivateRoute from './components/routes/PrivateRoute'
import AdminRoute from './components/routes/AdminRoute'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	BrowserRouter,
} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import ProductView from './pages/user/ProductView'
import Cart from './pages/user/Cart'

const PageNotFound = () => {
	return (
		<>
			<h1 className='d-flex justify-content-center align-items-center vh-100'>
				404 | Page Not Found
			</h1>
		</>
	)
}

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Toaster />
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/shop' element={<Shop />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/search' element={<Search />} />
					<Route path='/product/:slug' element={<ProductView />} />

					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='' element={<Dashboard />} />
					</Route>

					<Route path='/dashboard' element={<AdminRoute />}>
						<Route path='admin' element={<AdminDashboard />} />
					</Route>

					<Route path='*' element={<PageNotFound />} replace />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
