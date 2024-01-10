import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { API_BASE_URL } from '../config';
import { Task } from '../models/Task';
import TaskInfo from './TaskInfo';
import {SkeletonTaskCard} from '../components/Skeleton';
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
            let data = response.data;
            setTasks(data.tasks);
            setTotalPages(data.total_pages);
        })
          .catch(function (error) {
            
        })
      }, [page, titleSearchPattern]);

    const searchInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitleSearchPattern(event.target.value);
    }

    const handlePageClick = (selected: { selected: number }) => {
      const newOffset = console.log(selected);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setPage(selected.selected+1);
    };

    return (
        <div className="task-page container">
          <div className="task-page__row">
            <input className='search-input' placeholder='Поиск заказов' type="text" onChange={searchInputChanged}/>
            <Link to='/tasks/create' className="task-page__create-task-btn">Создать заказ</Link>
          </div>
            {
              tasks.length === 0 ? 
                <>{[1,2,3,4,5,6].map((number) => <SkeletonTaskCard />)}</>
              :
                tasks.map(task => <TaskInfo {...task}/>)}
                <ReactPaginate className='pagination'
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  // pageRangeDisplayed={1}
                  pageCount={totalPages}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                />
        </div>
    );
}

export default TasksPage;