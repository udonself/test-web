
import { Link } from 'react-router-dom';
import '../css/MainPage.css';


const MainPage = () => {
    return(
        <div className="main-page container">
            <div className="infoblock">
                <div className="infoblock__row">
                    <div className="infoblock__column">
                        <h1 className="infoblock__title">Отдайте задачи специалистам и освободите время для важного</h1>
                        <p className='infoblock__subtitle'>Разработчики, дизайнеры и другие профессионалы ИТ-рынка готовы выполнить вашу задачу сейчас.</p>
                        <Link to='/freelancers' className="infoblock__freelancers-btn">Найти специалиста</Link>
                    </div>
                    <div className="infoblock__column">
                        <img className='infoblock__freelance-img' src="https://telegra.ph/file/f3980001442ad96b609e1.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;