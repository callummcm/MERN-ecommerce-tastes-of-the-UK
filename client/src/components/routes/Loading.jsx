import {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import LoadingGIF from '../../images/loading.gif'

const Loading = ({path = 'login'}) => {
	const [count, setCount] = useState(3)

	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount)
		}, 1000)
		// redirect after count 0
		count === 0 &&
			navigate(`/${path}`, {
				state: location.pathname,
			})
		// cleanup
		return () => clearInterval(interval)
	}, [count])

	return (
		<>
			<div
				className='d-flex justify-content-center align-items-center vh-100 flex-column'
				style={{height: '90vh'}}
			>
				<img src={LoadingGIF} alt='Loading' style={{width: '400px'}} />
			</div>
		</>
	)
}

export default Loading
