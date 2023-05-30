import React from 'react'

const Jumbotron = ({title, subtitle}) => {
	return (
		<>
			<div className='container-fluid jumbotron'>
				<div className='row'>
					<div className='col text-center p-4'>
						<h1>{title}</h1>
						<p className='lead'>{subtitle}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Jumbotron
