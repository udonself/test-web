import axios from 'axios';
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import yellowStar from '../images/yellow-star.svg';
import grayStar from '../images/gray-star.svg';
import editIcon from '../images/edit.svg';
import exitIcon from '../images/exit.svg';
import { ProfileInfo } from '../models/ProfileInfo';
import {UserReview} from '../models/ProfileInfo';
import Review from './Review';
import useAxiosHeader from '../customHooks/useAxiosHeader';
import Popup from './Popup';
import '../css/UserPage.css';
import Cookies from 'js-cookie';


const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]);
      };
      reader.onerror = () => {
        reject(new Error('Error occurred while reading the file.'));
      };
      reader.readAsDataURL(file);
    });
  };


function UserPage() {
    const { id } = useParams<{ id: string }>();
    const header = useAxiosHeader();
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

    // popup 
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    
    // states to send review
    const [reviewRating, setReviewRating] = useState<number>(0);
    const [starsList, setStarsList] = useState<any[]>([1,2,3,4,5].map(value => <img className='star' key={value} src={grayStar} onClick={() => handleRatingChanged(value)}/>)); // list of star images
    const [reviewText, setReviewTest] = useState<string>('');

    // states for profile edit (if user is owner of its profile)
    const [profileOwner, setProfileOwner] = useState<boolean>(true);
    const [usernameEditing, setUsernameEditing] = useState<boolean>(false);
    const [changedUsername, setChangedUsername] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
    
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
          setSelectedImage(file);
            fileToBase64(file).then(base64 => {
                console.log(base64);
                if (!header) return;
                const data = {base64avatar: base64};
                const response = axios.post(`${API_BASE_URL}/users/changeAvatar`, data, { headers: header});
                });
            // console.log(base64);
        }
        else {
          setSelectedImage(null);
        }
      };

      const handleImageClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };


    const exitFromAccount = () => {
        Cookies.remove('token');
        navigate('/');
    }

    const handleChangeUsernameClick = () => {
        if(changedUsername !== profileInfo?.username) {
            console.log('Надо менять!');
            if (!header) return;
            let sendMessageApiUrl = `${API_BASE_URL}/users/changeUsername`;
            const data = {
                new_username: changedUsername
                };
            const response = axios.post(sendMessageApiUrl, data, { headers: header});
            setTimeout(functionForUseEffect, 500);
        }
        else {
            console.log('Не надо менять!');
        }
        setChangedUsername(profileInfo ? profileInfo.username : '');
        setUsernameEditing(!usernameEditing);
    }


    const handleRatingChanged = (newRating: number) => {
        let newStarsList: any[] = [];
        for(let i = 0; i < 5; i ++){
            newStarsList.push(<img key={i+1} className='star' onClick={() => handleRatingChanged(i+1)} src={i < newRating ? yellowStar : grayStar}/>);
        }
        setStarsList(newStarsList);
        setReviewRating(newRating);
        // window.location.reload();
    }

    const handleReviewTextChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewTest(event.target.value);
    }

    const showPopup = (text: string) => {
        setErrorText(text);
        setPopupOpen(true);
    }

    const sendReview = () => {
        if(!header){
            showPopup("Для выполнения этого действия необходимо авторизоваться!");
            return;
        }
        else if(reviewText.length < 10){
            console.log('Минимальная длина отзыва - 10 символов!');
            return;
        }
        else if(reviewRating == 0) {
            console.log('Выберите оценку для отзыва!');
            return;
        }
        let createReviewApiUrl = `${API_BASE_URL}/reviews/create`;
        const data = {
            to_id: profileInfo?.id,
            rating: reviewRating,
            content: reviewText
          };
        const response = axios.post(createReviewApiUrl, data, { headers: header});
        handleRatingChanged(0);
        setTimeout(() => functionForUseEffect(), 500);
    }

    const functionForUseEffect = () => {
        setProfileOwner(false);
        setChangedUsername('');
        setUsernameEditing(false);
        let profileApiUrl = `${API_BASE_URL}/users/${id}`;
        axios.get(profileApiUrl)
          .then(function (response) {
            console.log(response);
            setProfileInfo(response.data);
            setChangedUsername(response.data.username);
        })
          .catch(function (error) {
            console.log(error);
        }).then(() => {
            if(header){
                axios.get(`${API_BASE_URL}/users/me`, {headers: header}).then(response => {
                    setProfileOwner(id == response.data.id);
                    // console.log(id === response.data.id);
                }).catch(error =>{
                    console.log(':(');
                }) ;
            }
            else {
                console.log('!header');
            }
        })
    }

    useEffect(() => {
        functionForUseEffect();
      }, [id, header]);

    return (
        <>
            <div className="target-freelancer-page container">
                {
                    profileInfo ? 
                        <div className="user-card">
                            {
                                profileOwner ? 
                                    <img onClick={() => exitFromAccount()} className='user-card__exit-btn' src={exitIcon} alt="exit" />
                                : ''
                            }
                            <div className="user-card__row">
                                <div className="user-card__column">
                                    <div className="user-card__avatar-container">
                                        <img className='user-card__avatar' src={selectedImage ? URL.createObjectURL(selectedImage) : profileInfo.avatar} alt="user avatar" />
                                        <div className="user-card__rating">
                                            {profileInfo.avg_rating ? 
                                                profileInfo.avg_rating.toFixed(2)
                                            : '???'}
                                            ★
                                        </div>
                                        {
                                        profileOwner ?
                                            <label className="custom-file-upload">
                                                <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageChange} style={{ display: 'none' }}/>
                                                <img className='user-card__edit-avatar-btn' onClick={handleImageClick} src={editIcon} alt="Upload" width="24" height="24" />
                                            </label>
                                        : ''
                                        }
                                    </div>
                                    {
                                        profileOwner ?
                                        <div className="user-card__edit-username">
                                            <img onClick={() => handleChangeUsernameClick()} className='user-card__edit-username-btn' src={editIcon} alt="" />
                                            {
                                                usernameEditing ?
                                                    <textarea className='user-card__edited-username' value={changedUsername} onChange={(e) => setChangedUsername(e.target.value)}></textarea>
                                                :
                                                    <span className='user-card__username'>{changedUsername}</span>
                                            }
                                        </div>
                                        :
                                        <p className='user-card__username'>
                                            {profileInfo.username}
                                        </p>
                                    }
                                    
                                </div>
                                <div className="user-card__column category-column">
                                    {
                                        profileInfo.role === "customer" ?
                                            <>
                                                <p className='user-card__role'>Заказчик</p>
                                                <img src="" alt="" />
                                            </>
                                        :
                                            <>
                                                <p className='user-card__role'>Специалист</p>
                                                {profileInfo.user_categories.map(category => 
                                                    <div className="user-card__category">
                                                        <img src={category.icon} alt="category icon" />
                                                        <span>{category.name}</span>
                                                    </div>
                                                )}
                                            </>
                                    }
                                </div>
                                <div className="user-card__column message-column">
                                    <Link className='user-card__link-to-conversation' to={`/conversation/${id}`}>
                                        <div className="user-card__message-btn">
                                            Написать
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    : ''
                }
                <div className="add-review">
                    <div className="add-review__row">
                        <h1 className='add-review__title'>Оставить отзыв</h1>
                        <div className='review__rating add-review__rating'>
                            {
                                starsList.map(star => star)
                            }
                        </div>
                    </div>
                    <div className="add-review__row content-row">
                        <textarea placeholder='Текст отзыва' className='add-review__input' onChange={handleReviewTextChanged}></textarea>
                        <div className="add-review__send-btn" onClick={() => sendReview()}>Отправить</div>
                    </div>
                </div>
                <div className="reviews">
                    {
                        profileInfo ?
                            profileInfo.user_reviews.map(review => 
                                <Review {...review}/>
                            )
                        : ''
                    }
                </div>
            </div>
            <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
                {errorText}
            </Popup>
        </>
    );
}

export default UserPage;