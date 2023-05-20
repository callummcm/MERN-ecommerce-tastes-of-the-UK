import {NavLink} from 'react-router-dom'

const UserMenu = ({setShowUserInfo, setManageProfile, setShowOrderHistory}) => {
	const handleItemClick = (itemName) => {
		setShowUserInfo(itemName === 'userInfo' ? true : false)
		setManageProfile(itemName === 'manageProfile' ? true : false)
		setShowOrderHistory(itemName === 'orderHistory' ? true : false)
	}

	return (
		<>
			<div className='p-3 mt-2 mb-2 h4 bg-light text-center'>User Links</div>
			<ul className='list-group'>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('userInfo')}
				>
					User info
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('manageProfile')}
				>
					Profile
				</li>
				<li
					className='list-group-item pointer list-group-item-action'
					onClick={() => handleItemClick('orderHistory')}
				>
					Order history
				</li>
			</ul>
		</>
	)
}

export default UserMenu
