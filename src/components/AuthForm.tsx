import React from 'react';
import { useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config';
import '../css/AuthForm.css';
import { Category } from '../models/Category';
import closeIcon from '../images/close_icon.svg';
import { log } from 'console';


enum AuthMode{
    Auth,
    Register
}

type UserRole = 'customer' | 'freelancer';

interface RegisterParams {
    username: string,
    password: string,
    role: UserRole,
    categories: Category[] | null
}

interface LoginParams {
    username: string,
    password: string
}

interface AuthFormProps {
    setAuthFormOpened: Function
}

const AuthForm: React.FC<AuthFormProps> = ({setAuthFormOpened}) =>{
    const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.Auth);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [role, setRole] = useState<UserRole|null>(null);
    const [errorText, setErrorText] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        let categoriesApiUrl = `${API_BASE_URL}/categories/get`;
        axios.get(categoriesApiUrl)
          .then(function (response) {
            setCategories(response.data);
        })
          .catch(function (error) {
            //
        })
      }, []);

    function changeAuthMode(){
        setAuthMode(authMode === AuthMode.Auth ? AuthMode.Register : AuthMode.Auth);
        setLogin('');
        setPassword('');
        setRepeatPassword('');
        setErrorText('');
        setRole(null);
        setSelectedCategories([]);
    }
    // input handlers 
    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
        setErrorText('');
    };
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorText('');
    };
    const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
        setErrorText('');
    };
    const handleRoleChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setSelectedCategories([]);
        if(event.target.value == 'freelancer') setRole('freelancer');
        else if(event.target.value == 'customer') setRole('customer');
        console.log(role);
    } 

    const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget){
         setAuthFormOpened(false);   
        }
    }

    function registerAuthRequest() {
        if(role === null) {
            setErrorText('Выберите свою роль!');
            return;
        }
        else if(login === '' || password === '' || repeatPassword === '') {
            setErrorText('Заполните все поля!');
            return;
        }
        else if(login.length < 7) {
            setErrorText('Длина логина должна быть не меньше 7 символов!');
            return;
        }
        else if(password != repeatPassword) {
            setErrorText('Пароли должны совпадать!');
            return;
        }
        else if(password.length < 7) {
            setErrorText('Длина пароля должна быть не менее 7 символов!');
            return;
        }
        else if (role === 'freelancer' && selectedCategories.length === 0){
            setErrorText('Выберите ваши направления!');
            return;
        }
        let registerApiUrl = `${API_BASE_URL}/users/register`;
        let registerParams: RegisterParams = {
            username: login,
            password: password,
            role: role,
            categories: selectedCategories
        }
        axios.post(registerApiUrl, registerParams)
          .then(function (response) {
            console.log(response);
            Cookies.set('token', response.data.token);
            setAuthFormOpened(false);
        })
          .catch(function (error) {
            if(error.response){
                setErrorText(error.response.data.detail);
            }
        })
    }

    function loginAuthRequest() {
        if(login === '' || password === '') {
            setErrorText('Заполните все поля!');
            return;
        }
        let loginApiUrl = `${API_BASE_URL}/users/auth`;
        let loginParams: LoginParams = {
            username: login,
            password: password
        };
        axios.get(loginApiUrl, {params: loginParams})
          .then(function (response) {
            console.log(response);
            // console.log(response.data.token);
            Cookies.set('token', response.data.token);
            setAuthFormOpened(false);
        })
          .catch(function (error) {
            if(error.response){
                setErrorText(error.response.data.detail);
            }
        })
    }

    // auth btn click handler
    function authRequest() {
        if(authMode === AuthMode.Register){
            registerAuthRequest();
        }
        else if (authMode === AuthMode.Auth){
            loginAuthRequest();
        }
    }


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, category: Category) => {
        const isChecked = event.target.checked;
    
        if (isChecked) {
          setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, category]);
        } else {
          setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.filter((selectedCategory) => selectedCategory.id !== category.id)
          );
        }
        console.log(selectedCategories.map(category => category.id));
      };

    return(
        <div className="auth-wrapper" onMouseDown={handleWrapperClick}>
            <div className='auth-form'>
                <div className="auth-form__first-row">
                    <span className="auth-form__title">
                        {authMode === AuthMode.Auth ? 'Вход' : 'Регистрация'}
                    </span>
                    <img className='closeBtn' src={closeIcon} alt="close icon" onClick={() => setAuthFormOpened(false)}/>
                </div>
                <span className="error">{errorText}</span>
                {authMode === AuthMode.Register ?
                    <div className="role-selection">
                        <label title="Подходит, если вы ищите специалистов для решения вашей задачи!">
                            <input type="radio" name="role" value="customer" onChange={handleRoleChanged} />
                            <span>Заказчик</span>
                        </label>
                        <label title="Подходит, если вы хотите выполнять заказы заказчиков!">
                            <input type="radio" name="role" value="freelancer" onChange={handleRoleChanged} />
                            <span>Фрилансер</span>
                        </label>
                    </div>
                    : ''
                }
                
                {
                    role === 'freelancer' ?
                        <div className='categories-choose'>
                            <span className="categories-choose__title">Укажите ваши направления</span>
                            {categories.map((category) => (
                                <div>
                                    <label key={category.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.some((selectedCategory) => selectedCategory.id === category.id)}
                                        onChange={(e) => handleCheckboxChange(e, category)}
                                    />
                                    {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    : ''
                }
                

                <input className='auth-form__login-input input' onChange={handleLoginChange} placeholder='Логин' type="text" value={login}/>
                <input className='auth-form__password-input input' onChange={handlePasswordChange} placeholder='Пароль' type="password" value={password}/>
                {authMode === AuthMode.Register ? <input className='auth-form__repeat-password-input input' onChange={handleRepeatPasswordChange} placeholder='Повтор пароля' type="password" value={repeatPassword} /> : ''}
                <div className='auth-form__auth-btn' onClick={authRequest}>
                    {authMode === AuthMode.Auth ? 'Войти' : 'Зарегистрироваться'}
                </div>
                <span className='auth-form__mode-switcher' onClick={changeAuthMode}>
                    {authMode === AuthMode.Auth ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
                </span>
            </div>
        </div>
    )
}

export default AuthForm;