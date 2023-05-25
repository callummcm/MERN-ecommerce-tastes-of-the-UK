import {NavLink, useNavigate} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import {useEffect, useRef, useState} from 'react'
import Login from '../auth/Login'
import Register from '../auth/Register'
import {Modal} from 'antd'

const Navbar = () => {
	const [auth, setAuth] = useAuth()
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [showRegisterModal, setShowRegisterModal] = useState(false)
	const navigate = useNavigate()

	const handleLogout = () => {
		setAuth({...auth, user: null, token: ''})
		localStorage.removeItem('auth')
		navigate('')
		toast('You have been logged out')
	}

	const handleCloseLoginModel = () => {
		setShowLoginModal(false)
	}

	const handleCloseRegisterModel = () => {
		setShowRegisterModal(false)
	}

	return (
		<>
			<ul className='nav d-flex justify-content-between'>
				<li className='nav-item'>
					<NavLink className='nav-link' aria-current='page' to='/'>
						HOME
					</NavLink>
				</li>

				<Modal
					open={showLoginModal}
					onOk={handleCloseLoginModel}
					onCancel={handleCloseLoginModel}
					footer={null}
				>
					<Login closeModal={handleCloseLoginModel} />
				</Modal>

				<Modal
					open={showRegisterModal}
					onOk={handleCloseRegisterModel}
					onCancel={handleCloseRegisterModel}
					footer={null}
				>
					<Register closeModal={handleCloseRegisterModel} />
				</Modal>

				{!auth?.user ? (
					<>
						<li className='nav-item'>
							<button
								className='nav-link'
								aria-current='page'
								onClick={() => setShowLoginModal(true)}
							>
								LOGIN
							</button>
						</li>
						<li className='nav-item'>
							<button
								className='nav-link'
								aria-current='page'
								onClick={() => setShowRegisterModal(true)}
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
