import {useAuth} from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'

const Dashboard = () => {
	const [auth, setAuth] = useAuth()

	return (
		<>
			<Jumbotron
				title={`Hello ${auth?.user?.name}`}
				subtitle='User Dashboard'
			/>
		</>
	)
}

export default Dashboard
