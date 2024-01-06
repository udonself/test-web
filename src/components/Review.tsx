import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import {UserReview} from '../models/ProfileInfo';
import yellowStar from '../images/yellow-star.svg';
import grayStar from '../images/gray-star.svg';
import '../css/Review.css';


const Review: React.FC<UserReview> = ({from_id, from_avatar, from_username, date, rating, content}) => {
    const stars = [];
    for(let i = 0; i < 5; i ++){
        stars.push(<img src={i < rating ? yellowStar : grayStar}/>);
    }

    return (
        <div className="review">
            <div className="review__row">
                <div className="review__column">
                    <Link to={`/users/${from_id}`}>
                        <img className='review__from-avatar' src={from_avatar} alt="from review avatar" />
                    </Link>
                    <div className="review__username-mark">
                        <Link to={`/users/${from_id}`}>
                            <span className="review__from-username">{from_username}</span>
                        </Link> <br/>
                        <div className="review__rating">
                            {
                                stars.map(star => star)
                            }
                        </div>
                    </div>
                </div>
                <div className="review__column">{date}</div>
            </div>
            <div className="review__row content-row">
                {content}
            </div>
        </div>
    );
}

export default Review;