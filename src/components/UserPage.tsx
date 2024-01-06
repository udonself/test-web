import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import { ProfileInfo } from '../models/ProfileInfo';
import {UserReview} from '../models/ProfileInfo';
import Review from './Review';
import '../css/UserPage.css';


function UserPage() {
    const { id } = useParams<{ id: string }>();
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);


    useEffect(() => {
        let profileApiUrl = `${API_BASE_URL}/users/${id}`;
        axios.get(profileApiUrl)
          .then(function (response) {
            console.log(response);
            setProfileInfo(response.data);
        })
          .catch(function (error) {
            console.log(error);
        })
      }, []);

    return (
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
                                            <p>Заказчик</p>
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
    );
}

export default UserPage;