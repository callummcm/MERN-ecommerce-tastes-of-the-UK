import {useAuth} from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'
import {useState} from 'react'
import Profile from '../../components/user/Profile'
import OrderHistory from '../../components/user/OrderHistory'
import UserMenu from '../../components/nav/UserMenu'

const Dashboard = () => {
	const [auth, setAuth] = useAuth()

	//state for admin Links
	const [showUserInfo, setShowUserInfo] = useState(true)
	const [manageProfile, setManageProfile] = useState(false)
	const [showOrderHistory, setShowOrderHistory] = useState(false)

	return (
		<>
			<Jumbotron
				title={`Hello ${auth?.user?.name}`}
				subtitle='User Dashboard'
			/>

			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-3'>
						<UserMenu
							setShowUserInfo={setShowUserInfo}
							setManageProfile={setManageProfile}
							setShowOrderHistory={setShowOrderHistory}
						/>
					</div>
					<div className='col-md-9'>
						{showUserInfo && (
							<>
								<div className='p-3 mt-2 mb-2 h4 bg-light'>User Info</div>
								<ul className='list-group'>
									<li className='list-group-item'>{auth?.user?.name}</li>
									<li className='list-group-item'>{auth?.user?.email}</li>
								</ul>
							</>
						)}
						{manageProfile && (
							<>
								<Profile />
							</>
						)}
						{showOrderHistory && (
							<>
								<OrderHistory />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
