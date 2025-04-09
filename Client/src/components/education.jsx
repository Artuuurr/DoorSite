import React from 'react'
import sert from '../../public/img/sert.png'
import feedIcon from '../../public/img/feedIcon.png'

const Education = () => (
	<section className='education'>
		<div className='education-header'>
			<h1>Повышение квалификации</h1>
			<p>
				Специально разработанные курсы для улучшения навыков и знаний в области
				производства дверей. Каждый курс включает теоретические и практические
				занятия.
			</p>
		</div>

		<div className='course'>
			<div className='course-categories'>
				<h2>Категории курсов:</h2>
				<div className='categories-buttons'>
					<button>Технологии производства</button>
					<button>Современные материалы</button>
					<button>Устойчивое производство</button>
					<button>Дизайн и эстетика дверей</button>
				</div>
			</div>
			<div className='courseImg'></div>
		</div>

		<div className='certificate-info'>
			<div className='certificate'>
				<h3>
					По окончании каждого курса участники
					<br /> получают сертификаты, подтверждающие
					<br /> их квалификацию и повышение
					<br /> профессиональных навыков.
				</h3>
				<img src={sert} alt='Сертификат' />
			</div>
		</div>

		<div className='feedback-section'>
			<div className='rating'></div>
			<h4>Оцените наши курсы по повышению квалификации</h4>
			<div className='feedback-card'>
				<button>к курсам</button>
				<p>
					Данный блок повышения квалификации позволит сотрудникам
					производственных предприятий не только усовершенствовать свои навыки,
					но и быть в курсе современных технологий и тенденций в производстве
					дверей.
				</p>
			</div>
			<div className='flex'>
				<div>
					<p>1 день</p>
				</div>
				<div className='flex2'>
					<img src={feedIcon} alt='icon' /> <p>12</p>
				</div>
			</div>
		</div>
	</section>
)

export default Education
