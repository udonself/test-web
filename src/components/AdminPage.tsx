import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';

import { Category } from '../models/Category';
import { API_BASE_URL } from '../config';
import '../css/AdminPage.css';


const AdminPage = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryTitle, setCategoryTitle] = useState<string>('');
    const [categoryIconUrl, setCategoryIconUrl] = useState<string>('');

    const [username, setUsername] = useState<string>('');
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [isAdmin, setIsAdmin] = useState<boolean>(false);


    useEffect(() => {
        // check is user admin and redirect to main page if he is not
        const token: string | undefined = Cookies.get('token');
        if (!token) navigate('/');
        axios.get(`${API_BASE_URL}/users/role`, {headers: { Authorization: `Bearer ${token}` }}).then(response => {
            // navigate(`users/${response.data.id}`);
            if(response.data != 'admin') navigate('/');
        }).catch(error =>{}) ;

        setIsAdmin(true);

        let categoriesApiUrl = `${API_BASE_URL}/categories/get`;
        axios.get(categoriesApiUrl)
          .then(function (response) {
            setCategories(response.data);
        })
          .catch(function (error) {
            setMsg(error.detail);
        })
    }, []);

    const verifyUser = () => {
        const token: string | undefined = Cookies.get('token');
        axios.post(`${API_BASE_URL}/users/verify`, {username: username}, {headers: { Authorization: `Bearer ${token}` }}).then(response => {
            console.log(response);
            setIsChanged(true);
            setMsg('Статус успешно подтвержден!');
        }).catch(error =>{
            console.log();
            setIsChanged(false);
            setMsg(error.response.data.detail);
        }) ;
    }

    const addCategory = () => {
        const token: string | undefined = Cookies.get('token');
        axios.post(`${API_BASE_URL}/categories/add`, {name: categoryTitle, icon: categoryIconUrl}, {headers: { Authorization: `Bearer ${token}` }}).then(response => {
            console.log(response);
            setIsChanged(true);
            setMsg('Категория добавлена!');
        }).catch(error =>{
            console.log();
            setIsChanged(false);
            setMsg(error.response.data.detail);
        }) ;
    }

    return (
        <div className='admin-page container'>
            {
                isAdmin ? 
                    <div className="admin">
                        <div className="admin-categories">
                            <h1>Категории</h1>
                            {
                                categories.map(category => <div className={`creating-task__category admin-category`}>
                                    <img src={category.icon} alt="category icon" />
                                    <span>{category.name}</span>
                                </div>)
                            }
                            <input placeholder='Название' type="text" value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} style={{marginTop: 20}}/>
                            <input placeholder='Ссылка на иконку' type="text" value={categoryIconUrl} onChange={(e) => setCategoryIconUrl(e.target.value)} style={{marginTop: 20, width: 270}}/>
                            <div onClick={addCategory} className='admin__add-category-btn admin-btn'>Добавить категорию</div>
                        </div>
                        <h1>Подтверждение статуса пользователя</h1>
                        <input placeholder='Юзернейм' type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{marginTop: 10}}/>
                        <div className='admin__verify-btn admin-btn' onClick={verifyUser}>Подтвердить статус пользователя</div>
                        <p className={`admin-username-info ${!isChanged ? 'error': ''}`}>{msg}</p>
                    </div>
                    
                : ''
            }
        </div>
    )
}

export default AdminPage;