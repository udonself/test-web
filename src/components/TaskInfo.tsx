import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Task } from '../models/Task';
import '../css/TaskInfo.css';
import priceIcon from '../images/price.png';


const TaskInfo: React.FC<Task> = ({id, category, title, responses, created}) => {
    return (
      <Link to={`/tasks/${id}`} className="task-info">
        <div className="task-info__row">
          <div className="task-info__title">{title}</div>
          {/* <div className="task-info__responses">{responses} откликов</div> */}
          <div className="task-info__category">{category}</div>
        </div>
        <div className="task-info__row price-row">
          <div className="prefer-price">
            <img src={priceIcon} className='prefer-price__icon' alt="price icon" />
            <span className="prefer-price__value">
              Договорная
            </span>
          </div>
        </div>
      </Link>
    );
  }
  
  export default TaskInfo;