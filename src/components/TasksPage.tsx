import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { API_BASE_URL } from '../config';
import { Task } from '../models/Task';
import TaskInfo from './TaskInfo';
import '../css/TasksPage.css';


function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [titleSearchPattern, setTitleSearchPattern] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        let tasksApiUrl = `${API_BASE_URL}/tasks/get`;
        let params = {page: page, page_size: 5, pattern: titleSearchPattern};
        axios.get(tasksApiUrl, {params: params})
          .then(function (response) {
            console.log(response);
            setTasks(response.data);
        })
          .catch(function (error) {
            
        })
      }, [page, titleSearchPattern]);

    const searchInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleSearchPattern(event.target.value);
    }

    return (
        <div className="task-page container">
            <input className='search-input' placeholder='Поиск заказов' type="text" onChange={searchInputChanged}/>
            {tasks.map(task => <TaskInfo {...task}/>)}
        </div>
    );
}

export default TasksPage;