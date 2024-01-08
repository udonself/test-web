import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import yellowStar from '../images/yellow-star.svg';
import grayStar from '../images/gray-star.svg';
import { ProfileInfo } from '../models/ProfileInfo';
import {UserReview} from '../models/ProfileInfo';
import Review from './Review';
import useAxiosHeader from '../customHooks/useAxiosHeader';
import Popup from './Popup';
import '../css/UserPage.css';


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
        let profileApiUrl = `${API_BASE_URL}/users/${id}`;
        axios.get(profileApiUrl)
          .then(function (response) {
            console.log(response);
            setProfileInfo(response.data);
        })
          .catch(function (error) {
            console.log(error);
        })
    }

    useEffect(() => {
        functionForUseEffect();
      }, [id]);

    return (
        <>
            <div className="target-freelancer-page container">
                {
                    profileInfo ? 
                        <div className="user-card">
                            <div className="user-card__row">
                                <div className="user-card__column">
                                    <div className="user-card__avatar-container">
                                        <img className='user-card__avatar' src={profileInfo.avatar} alt="user avatar" />
                                        <div className="user-card__rating">
                                            {profileInfo.avg_rating ? 
                                                profileInfo.avg_rating.toFixed(2)
                                            : '???'}
                                            ★
                                        </div>
                                    </div>
                                    <p className='user-card__username'>
                                        {profileInfo.username}
                                    </p>
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
                                    <div className="user-card__message-btn">
                                        Написать
                                    </div>
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