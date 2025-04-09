import login from '../../public/img/login.png'
import React, { useState } from 'react'

const RegForm = ({ show, close, onSwitch, onRegister }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	})

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			console.log('Отправляемые данные:', formData)

			const response = await fetch('http://localhost:3000/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})

			const data = await response.json()
			console.log('Ответ от сервера:', data)

			if (response.ok) {
				alert(data.message)
				onRegister(formData)
				close()
			} else {
				alert(data.message)
			}
		} catch (err) {
			console.error('Ошибка при регистрации:', err)
			alert('Ошибка сервера')
		}
	}

	return (
		<>
			{show && (
				<div className='modal-overlay ' onClick={close}>
					<div className='modal-content' onClick={e => e.stopPropagation()}>
						<div className='windModal'>
							<h2 className='titleReg'>Регистрация</h2>
							<form onSubmit={handleSubmit}>
								<div className='form-group'>
									<input
										type='text'
										placeholder='Имя пользователя'
										value={formData.username}
										onChange={e =>
											setFormData({ ...formData, username: e.target.value })
										}
									/>
								</div>
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
								<p className='authForm'>
									<span>Уже есть аккаунт? </span>
									<a onClick={onSwitch}>Авторизация</a>
								</p>
								<button type='submit'>Зарегистрироваться</button>
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

export default RegForm
