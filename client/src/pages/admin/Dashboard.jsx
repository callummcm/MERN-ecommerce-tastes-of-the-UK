import {useAuth} from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'
import AdminMenu from '../../components/nav/AdminMenu'
import {useState} from 'react'
import CreateProduct from '../../components/admin/CreateProduct'
import ManageProducts from '../../components/admin/ManageProducts'
import Category from '../../components/admin/Category'

const Dashboard = () => {
	const [auth, setAuth] = useAuth()

	//state for admin Links
	const [showAdminInfo, setShowAdminInfo] = useState(true)
	const [createProduct, setCreateProduct] = useState(false)
	const [manageProducts, setManageProducts] = useState(false)
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
							setCreateProduct={setCreateProduct}
							setManageProducts={setManageProducts}
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
						{createProduct && <CreateProduct />}
						{manageProducts && <ManageProducts />}
						{manageCategory && <Category />}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dashboard
