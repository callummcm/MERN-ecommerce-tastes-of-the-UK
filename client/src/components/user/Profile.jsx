import {useState, useEffect} from 'react'
import {useAuth} from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
	// context
	const [auth, setAuth] = useAuth()
	// state
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [shippingAddress, setShippingAddress] = useState('')

	useEffect(() => {
		if (auth?.user) {
			const {name, email, shippingAddress} = auth.user
			setName(name)
			setEmail(email)
			setShippingAddress(shippingAddress)
		}
	}, [auth?.user])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const {data} = await axios.put('/profile', {
				name,
				currentPassword,
				newPassword,
				shippingAddress,
			})

			if (data?.error) {
				toast.error(data.error)
			} else {
				setAuth({...auth, user: data})
				// local storage update
				let ls = localStorage.getItem('auth')
				ls = JSON.parse(ls)
				ls.user = data
				localStorage.setItem('auth', JSON.stringify(ls))
				setCurrentPassword('')
				setNewPassword('')
				toast.success('Profile updated')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light'>Profile</div>

			<form onSubmit={handleSubmit}>
				<div className='form-floating'>
					<input
						type='text'
						className='form-control mb-3 mt-3'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus={true}
					/>
					<label className='opacity-50'>Username</label>
				</div>

				<div className='form-floating'>
					<input
						type='email'
						className='form-control mb-3 mt-3'
						placeholder=''
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={true}
					/>
					<label className='opacity-50'>Email</label>
				</div>

				<div className='form-floating'>
					<input
						type='password'
						className='form-control mb-3 mt-3'
						placeholder=''
						value={currentPassword}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
					<label className='opacity-50'>Current Password</label>
				</div>

				<div className='form-floating'>
					<input
						type='password'
						className='form-control mb-3 mt-3'
						placeholder=''
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<label className='opacity-50'>New Password if Desired</label>
				</div>

				<div className='form-floating'>
					<textarea
						className='form-control mb-3 mt-3'
						placeholder='Enter your address'
						value={shippingAddress}
						onChange={(e) => setShippingAddress(e.target.value)}
					/>
					<label className='opacity-50'>Shipping Address</label>
				</div>

				<button className='btn btn-primary m-2 p-2'>Submit</button>
			</form>
		</>
	)
}

export default Profile
