import {useSearch} from '../../context/search'
import ProductCard from '../../components/cards/ProductCard'
import Jumbotron from '../../components/cards/Jumbotron'

const Search = () => {
	const [values, setValues] = useSearch()

	return (
		<>
			<div>
				<Jumbotron
					title={`Search results for "${values?.keyword}"`}
					subtitle={
						values?.results?.length < 1
							? 'No products found'
							: `Found ${values?.results?.length} results`
					}
				/>

				<div className='container mt-3'>
					<div className='row'>
						{values?.results?.map((p) => (
							<div key={p._id} className='col-md-3'>
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Search
