import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Freelancer } from '../models/Freelancer';
import '../css/FreelancerInfo.css';


const FreelancerInfo: React.FC<Freelancer> = ({id, username, avatar, verified, rating, categories}) => {
    return (
      <Link to={`/users/${id}`} className="freelancer-info">
        {
            verified ?
                <div className="confirmed-user-block">Подтвержден</div>
            : ''
        }
        <div className="freelancer-info__row">
            <div className="avatar-container">
                <img className='freelancer-info__avatar' src={avatar} alt="" />
                <div className="freelancer-info__rating">
                    {rating ? 
                        rating.toFixed(2)
                    : '???'}
                    ★
                </div>
            </div>
        </div>
        <div className="freelancer-info__row">
            <span className="freelancer-info__username">{username}</span>
        </div>
        <div className="freelancer-info__row categories_row">
            {
            categories.map(category =>
                    <div className='task-info__category'>{category}</div>
                )
            }
        </div>
      </Link>
    );
  }
  
  export default FreelancerInfo;