import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'
import {AuthProvider} from './context/auth'
import {ContentProvider} from './context/ContentProvider'
import {SearchProvider} from './context/search'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ContentProvider>
				<SearchProvider>
					<App />
				</SearchProvider>
			</ContentProvider>
		</AuthProvider>
	</React.StrictMode>
)
