import {NavLink, useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import {useEffect, useRef} from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'

const Navbar = () => {
	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()

	const loginModalRef = useRef()
	const registerModalRef = useRef()

	const handleLogout = () => {
		setAuth({...auth, user: null, token: ''})
		localStorage.removeItem('auth')
		navigate('')
		toast('You have been logged out')
	}

	const handleShowModal = (modalToShow) => {
		if (modalToShow === 'login') loginModalRef.current.showModal()
		else registerModalRef.current.showModal()
	}

	const handleCloseModal = (modalToClose) => {
		if (modalToClose === 'login') loginModalRef.current.close()
		else registerModalRef.current.close()
	}

	useEffect(() => {
		const loginModalHandler = (e) => {
			const loginModalDimensions = loginModalRef.current.getBoundingClientRect()
			if (
				e.clientX < loginModalDimensions.left ||
				e.clientX > loginModalDimensions.right ||
				e.clientY < loginModalDimensions.top ||
				e.clientY > loginModalDimensions.bottom
			) {
				handleCloseModal('login')
			}
		}
		const registerModalHandler = (e) => {
			const registerModalDimensions =
				registerModalRef.current.getBoundingClientRect()
			if (
				e.clientX < registerModalDimensions.left ||
				e.clientX > registerModalDimensions.right ||
				e.clientY < registerModalDimensions.top ||
				e.clientY > registerModalDimensions.bottom
			) {
				handleCloseModal('register')
			}
		}

		loginModalRef.current.addEventListener('click', loginModalHandler)
		registerModalRef.current.addEventListener('click', registerModalHandler)

		return () => {
			loginModalRef.current.removeEventListener('click', loginModalHandler)
			registerModalRef.current.removeEventListener(
				'click',
				registerModalHandler
			)
		}
	}, [])

	return (
		<>
			<ul className='nav d-flex justify-content-between'>
				<li className='nav-item'>
					<NavLink className='nav-link' aria-current='page' to='/'>
						HOME
					</NavLink>
				</li>

				<dialog ref={loginModalRef} style={{minWidth: '35%'}}>
					<Login closeModal={handleCloseModal} />
				</dialog>
				<dialog ref={registerModalRef} style={{minWidth: '35%'}}>
					<Register closeModal={handleCloseModal} />
				</dialog>

				{!auth?.user ? (
					<>
						<li className='nav-item'>
							<button
								className='nav-link'
								aria-current='page'
								onClick={() => handleShowModal('login')}
							>
								LOGIN
							</button>
						</li>
						<li className='nav-item'>
							<button
								className='nav-link'
								aria-current='page'
								onClick={() => handleShowModal('register')}
							>
								REGISTER
							</button>
						</li>
					</>
				) : (
					<div className='dropdown'>
						<li>
							<a
								className='nav-link pointer dropdown-toggle'
								data-bs-toggle='dropdown'
							>
								{auth?.user?.name}
							</a>
							<ul className='dropdown-menu'>
								<li className='nav-item'>
									<NavLink
										className='nav-link'
										to={`/dashboard/${
											auth?.user?.admin === true ? 'admin' : ''
										}`}
									>
										Dashboard
									</NavLink>
								</li>
								<li className='nav-item'>
									<a onClick={handleLogout} className='nav-link pointer'>
										Logout
									</a>
								</li>
							</ul>
						</li>
					</div>
				)}
			</ul>
		</>
	)
}

export default Navbar
