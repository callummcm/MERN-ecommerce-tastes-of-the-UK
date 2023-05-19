import {NavLink, useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'

const Menu = () => {
	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		setAuth({...auth, user: null, token: ''})
		localStorage.removeItem('auth')
		navigate('')
		toast('You have been logged out')
	}

	return (
		<>
			<ul className='nav d-flex justify-content-between'>
				<li className='nav-item'>
					<NavLink className='nav-link' aria-current='page' to='/'>
						HOME
					</NavLink>
				</li>

				{!auth?.user ? (
					<>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/login'>
								LOGIN
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/register'>
								REGISTER
							</NavLink>
						</li>
					</>
				) : (
					<li className='nav-item'>
						<a onClick={handleLogout} className='nav-link pointer'>
							LOGOUT
						</a>
					</li>
				)}
			</ul>
		</>
	)
}

export default Menu
