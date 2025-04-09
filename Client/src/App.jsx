import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Home from './components/home'
import Orders from './components/orders'
import Education from './components/education'

function App() {
	return (
		<>
			<Router>
				<div className='App'>
					<Header />
					<main>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/orders' element={<Orders />} />
							<Route path='/education' element={<Education />} />
						</Routes>
					</main>
				</div>
			</Router>
		</>
	)
}

export default App
