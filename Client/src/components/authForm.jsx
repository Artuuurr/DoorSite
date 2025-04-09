import login from '../../public/img/login.png'
import React, { useState } from 'react'

function AuthForm({ show, close, onSwitch, onLogin }) {
	const [formData, setFormData] = useState({ email: '', password: '' })

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			console.log('Отправляемые данные:', formData)
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})
			const data = await response.json()
			console.log('Ответ от сервера:', data)
			if (response.ok) {
				alert(data.message)
				onLogin(data.user)
				close()
			} else {
				alert(data.message)
			}
		} catch (err) {
			console.error('Ошибка в запросе:', err)
			alert('Ошибка сервера: ' + err.message)
		}
	}
	return (
		<>
			{show && (
				<div className='modal-overlay' onClick={close}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<div className='windModal'>
							<h2 className='titleAuth'>Авторизация</h2>
							<form onSubmit={handleSubmit}>
								<div className='form-group'>
									<input
										type='email'
										placeholder='Email'
										value={formData.email}
										onChange={e =>
											setFormData({ ...formData, email: e.target.value })
										}
									/>
								</div>
								<div className='form-group'>
									<input
										type='password'
										placeholder='Пароль'
										value={formData.password}
										onChange={e =>
											setFormData({ ...formData, password: e.target.value })
										}
									/>
								</div>
								<p className='regForm'>
									<span>Нет аккаунта? </span>
									<a onClick={onSwitch}>Зарегистрироваться</a>
								</p>
								<button type='submit'>Войти</button>
							</form>
						</div>
						<div className='imgModal'>
							<img src={login} alt='Дверь' />
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default AuthForm
