import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../public/img/logo.png'
import RegForm from './regForm'
import AuthForm from './authForm'
import user from '../../public/img/iconUser.png'

const Header = () => {
	const [showReg, setShowReg] = useState(false)
	const [showAuth, setShowAuth] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)

	const closeForm = () => {
		setShowReg(false)
		setShowAuth(false)
	}

	const switchToAuth = () => {
		setShowReg(false)
		setShowAuth(true)
	}

	const switchToReg = () => {
		setShowAuth(false)
		setShowReg(true)
	}

	const handleLogout = () => {
		setCurrentUser(null)
	}

	return (
		<header>
			<div className='logo'>
				<img src={logo} alt='logo' />
			</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Главная</Link>
					</li>
					<li>
						<Link to='/orders'>Заказы</Link>
					</li>
					<li>
						<Link to='/education'>Обучение</Link>
					</li>
				</ul>
			</nav>
			<div className='Authentication'>
				{currentUser ? (
					<>
						<span className='iconUser'>
							<img src={user} />
						</span>
						<span>{currentUser.username}</span>
						<button onClick={handleLogout}>Выйти</button>
					</>
				) : (
					<>
						<button onClick={() => setShowReg(true)}>Регистрация</button>
						<button onClick={() => setShowAuth(true)}>Авторизация</button>
					</>
				)}
			</div>
			<RegForm
				show={showReg}
				close={closeForm}
				onSwitch={switchToAuth}
				onRegister={user => setCurrentUser(user)}
			/>
			<AuthForm
				show={showAuth}
				close={closeForm}
				onSwitch={switchToReg}
				onLogin={user => setCurrentUser(user)}
			/>
		</header>
	)
}

export default Header
