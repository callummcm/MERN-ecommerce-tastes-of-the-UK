import {useState, useEffect} from 'react'
import axios from 'axios'
import {useSearch} from '../../context/search'
import {useNavigate} from 'react-router-dom'

const Search = () => {
	const [keyword, setKeyword] = useState('')
	const [results, setResults] = useState([])
	// hooks
	const [values, setValues] = useSearch()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			const {data} = await axios.get(`/products/search/${values.keyword}`)
			console.log(data)
			setValues({...values, results: data})
			navigate('/search')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div>
				<form className='d-flex' onSubmit={handleSubmit}>
					<input
						type='search'
						style={{borderRadius: '0px'}}
						className='form-control'
						placeholder='Search...'
						onChange={(e) => setValues({...values, keyword: e.target.value})}
						value={values.keyword}
					/>
					<button
						className='btn btn-outline-primary'
						type='submit'
						style={{borderRadius: '0px'}}
					>
						Search
					</button>
				</form>
			</div>
		</>
	)
}

export default Search
