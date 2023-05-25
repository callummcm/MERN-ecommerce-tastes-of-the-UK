import {useState} from 'react'
import Jumbotron from '../cards/Jumbotron'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../../context/auth'
import {useNavigate, useLocation} from 'react-router-dom'

const Login = ({closeModal}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('/login', {
				email,
				password,
			})

			if (response.data?.error) toast.error(response.data.error)
			else {
				localStorage.setItem('auth', JSON.stringify(response.data))
				setAuth({...auth, token: response.data.token, user: response.data.user})
				toast.success('Login successful')
				closeModal('login')
				navigate(
					location.state ||
						`/dashboard/${response.data?.user?.admin === true ? 'admin' : ''}`
				)
			}
		} catch (err) {
			console.log(err)
			toast.error('Login failed, try again.')
		}
	}

	return (
		<>
			<Jumbotron title='Login' subtitle='Welcome' />
			<div className='container mt-5'>
				<div className='row '>
					<div className='col-md-6' style={{minWidth: '100%'}}>
						<form onSubmit={handleSubmit}>
							<input
								type='email'
								className='form-control mb-4 p-2'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type='password'
								className='form-control mb-4 p-2'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className='btn btn-primary' type='submit'>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Login