import React from 'react'
import News from './news'
import Calendar from './calendar'
import Contacts from './contacts'

const Home = () => (
	<section className='home'>
		<div className='mainText'>
			<div>
				<h1>Мы</h1>
				<p>
					Команда, на которую можно положиться:
					<br /> создаем качество вместе!
				</p>
			</div>
		</div>
		<News />
		<Calendar />
		<Contacts />
	</section>
)

export default Home
