import {useState} from 'react'
import Jumbotron from '../cards/Jumbotron'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useAuth} from '../../context/auth'
import {useNavigate} from 'react-router-dom'

const Register = ({closeModal}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [auth, setAuth] = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const {data} = await axios.post('/register', {name, email, password})

			if (data?.error) toast.error(data.error)
			else {
				localStorage.setItem('auth', JSON.stringify(data))
				setAuth({...auth, token: data.token, user: data.user})
				toast.success('Registration successful')
				closeModal('register')
				navigate('/')
			}
		} catch (err) {
			console.log(err)
			toast.error('Registration failed, try again.')
		}
	}

	return (
		<>
			<Jumbotron title='Register' />
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-md-6' style={{minWidth: '100%'}}>
						<form onSubmit={handleSubmit}>
							<input
								type='text'
								className='form-control mb-4 p-2'
								placeholder='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
							/>
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
								Register
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
