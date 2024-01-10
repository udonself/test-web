import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '../config';
import { Category } from '../models/Category';
import useAxiosHeader from '../customHooks/useAxiosHeader';
import '../css/CreateTaskPage.css';


const CreateTaskPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const header = useAxiosHeader();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const navigate = useNavigate();

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
    
      
    const postTask = () => {
      if(!header) {
        return;
      }
      else if(title.length < 10){
        console.log('Длина заголовка должна быть не менее 10 символов!');
        return;
      }
      else if(description.length < 20){
        console.log('Длина опиисания должна быть не менее 20 символов!');
        return;
      }
      else if(!selectedCategoryId) {
        console.log('Выберите категорию, к которой относится ваш заказ!');
        return;
      }
      let createTaskApiUrl = `${API_BASE_URL}/tasks/create`;
      const data = {
        title: title,
        description: description,
        category_id: selectedCategoryId
      };
      const response = axios.post(createTaskApiUrl, data, { headers: header});
      return navigate('/tasks');
    }

    return(
        <div className="create-task-page container" >
           <div className="creating-task">
              <div className="creating-task__row">
                <div className="creating-task__column content-column">
                  <h1 className='creatig-task__name c-title'>Название заказа</h1>
                  <textarea className='creating-task__name-input input' placeholder='Например, разработать сайт...' value={title} onChange={(e) => setTitle(e.target.value)}/>
                  <h1 className='creatig-task__description c-title'>Описание заказа</h1>
                  <textarea className='creating-task__description-input input' placeholder='Минимально 20 символов' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="creating-task__column creating-task__category-column">
                  <div className="creating-task__row">
                    <h1 className='creatig-task__category-title c-title'>Выбор категории</h1>
                  </div>
                  <div className="creating-task__row categories-row">
                  {
                    categories.map(category => <div className={`creating-task__category ${category.id === selectedCategoryId ? 'selected-category' : ''}`} onClick={() => setSelectedCategoryId(category.id)}>
                      <img src={category.icon} alt="category icon" />
                      <span>{category.name}</span>
                    </div>)
                  }
                  </div>
                  <div className="creating-task__row send-row">
                    <div onClick={() => postTask()} className="creating-task__create-btn">Опубликовать</div>
                  </div>
                </div>
              </div>
           </div>
        </div>
    )
}

export default CreateTaskPage;