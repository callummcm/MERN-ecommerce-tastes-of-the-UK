import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'antd/dist/reset.css'
import {AuthProvider} from './context/auth'
import {ContentProvider} from './context/ContentProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<ContentProvider>
				<App />
			</ContentProvider>
		</AuthProvider>
	</React.StrictMode>
)
