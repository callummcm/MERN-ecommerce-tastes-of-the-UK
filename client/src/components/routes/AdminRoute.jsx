import {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import Loading from './Loading'
import axios from 'axios'

const AdminRoute = () => {
	const [auth, setAuth] = useAuth()

	const [ok, setOk] = useState(false)

	useEffect(() => {
		const adminCheck = async () => {
			const {data} = await axios.get('/admin-check')
			if (data.ok) setOk(true)
			else setOk(false)
		}

		if (auth?.token) adminCheck()
	}, [auth?.token])

	// useEffect(() => {
	// 	if (auth?.token) setOk(true)
	// 	else setOk(false)
	// }, [auth?.token])

	return <>{ok ? <Outlet /> : <Loading path='' />}</>
}

export default AdminRoute
