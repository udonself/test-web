import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from "../config";
import { ITaskInfo } from "../models/TaskInfo";
import '../css/TaskPage.css'


const TaskPage = () => {
    const {id} = useParams<{ id: string }>();
    const [task, setTask] = useState<ITaskInfo | null>(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/tasks/${id}`).then(response => {
            setTask(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return(
        <div className="t-task-page-wrapper container">
            <div className="t-task-page">
                <div>
                    <div className="t-task-page__row">
                        <Link to={`/users/${task?.customer_id}`} className="t-task-page__customer-info">
                            <img className='t-task-page__customer-avatar' src={task?.customer_avatar} alt="avatar" />
                            <h1 className="t-task-page__customer-username">{task?.customer_username}</h1>
                        </Link>
                        <span className="t-task-page__creation-date">{task?.created}</span>
                    </div>
                    <hr style={{marginTop: '10px'}}/>
                    <div className="t-task-page__row task-description-row">
                        <h1 className="t-task-page__task-title">{task?.title}</h1>
                        <p className="t-task-page__task-description">{task?.description}</p>
                    </div>
                </div>
                <div className="t-task-page__row msg-row">
                    <Link to={`/conversation/${task?.customer_id}`} className="t-task-page__msg-btn">
                        Обсудить заказ
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TaskPage;