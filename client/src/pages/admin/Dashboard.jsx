import {useAuth} from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/nav/AdminMenu'
import {useState} from 'react'
import AdminProduct from '../../components/admin/Product'
import AdminCategory from '../../components/admin/Category'

const Dashboard = () => {
	const [auth, setAuth] = useAuth()

	//state for admin Links
	const [showAdminInfo, setShowAdminInfo] = useState(true)
	const [manageProduct, setManageProduct] = useState(false)
	const [manageCategory, setManageCategory] = useState(false)

	return (
		<>
			<Jumbotron
				title={`Hello ${auth?.user?.name}`}
				subtitle='Admin Dashboard'
			/>

			<div className='container-fluid'>
				<div className='row'>
					<div className='col-md-3'>
						<AdminMenu
							setShowAdminInfo={setShowAdminInfo}
							setManageProduct={setManageProduct}
							setManageCategory={setManageCategory}
						/>
					</div>
					<div className='col-md-9'>
						{showAdminInfo && (
							<>
								<div className='p-3 mt-2 mb-2 h4 bg-light text-center'>
									Admin Info
								</div>
								<ul className='list-group'>
									<li className='list-group-item'>{auth?.user?.name}</li>
									<li className='list-group-item'>{auth?.user?.email}</li>
									<li className='list-group-item'>Admin</li>
								</ul>
							</>
						)}
						{manageProduct && (
							<>
								<AdminProduct />
							</>
						)}
						{manageCategory && (
							<>
								<AdminCategory />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
