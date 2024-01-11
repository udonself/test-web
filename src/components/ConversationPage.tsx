import React from "react"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

import { API_BASE_URL } from '../config';
import sendIcon from '../images/send.png';
import useAxiosHeader from '../customHooks/useAxiosHeader';
import { ProfileInfo } from '../models/ProfileInfo';
import {MessageOut, ConversationOut} from '../models/Conversation';
import '../css/ConversationPage.css';


const username = 'Elin Hellop';
const avatar = 'https://telegra.ph/file/3f093e11778b02df8e1c9.png';


const ConversationPage = () => {
    const {id} = useParams<{ id: string }>();
    const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
    const header = useAxiosHeader();
    const [conversationInfo, setConversationInfo] = useState<ConversationOut | null>(null);
    const [message, setMessage] = useState<string>('');

    const sendMessage = () => {
        if (!header) return;
        let sendMessageApiUrl = `${API_BASE_URL}/messages/send`;
        const data = {
            to_id: id,
            content: message
          };
        const response = axios.post(sendMessageApiUrl, data, { headers: header});
        setMessage('');
    }

    const updateMessages = () => {
        if(!header){
            console.log("Для выполнения этого действия необходимо авторизоваться!");
            // setTimeout(() => updateMessages(), 1000);
            return;
        }
        let convApiUrl = `${API_BASE_URL}/messages/get`;
        axios.get(convApiUrl, {
            params: {companion_id: id},
            headers: header
          })
          .then(function (response) {
            console.log(response.data);
            setConversationInfo(response.data);
        })
          .catch(function (error) {
            console.log(error);
        })
        // setTimeout(() => updateMessages(), 1000);
    }

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
        const timer = setTimeout(updateMessages, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [conversationInfo, header]);

    return (
        <div className="conversation-page container">
            <div className="conv">
                <Link to={`/users/${id}`} className="conv__header">
                        <img className="conv__avatar" src={profileInfo?.avatar} alt="companion avatar" />
                        <h1 className="conv__username">{profileInfo?.username}</h1>
                </Link>
                <hr className="conv__line"/>
                <div className="conv__messages">
                    {
                    conversationInfo ? 
                        Object.keys(conversationInfo.messages_grouped_by_date).length === 0 ?
                            <h1 className="conv__null-info">У вас пока нет сообщений. Начните обсуждать заказы!</h1>
                            :
                            Object.keys(conversationInfo.messages_grouped_by_date).map(date => 
                                <div className="conv__message-for-date">
                                    <div className="conv__date">{date}</div>
                                    {conversationInfo.messages_grouped_by_date[date].map(message => 
                                        <div className={`conv__message ${message.from_id.toString() === id ? 'companion_message' : 'my_message'}`}>
                                            <div className="message__content">
                                                <span className="content">{message.content}</span>
                                                <div className="conv__time">{`${message.hour}:${message.minute}`}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>    
                            )
                    : <h1 className="conv__null-info">Загрузка...</h1>
                    }
                </div>
                <div className="conv__send-msg">
                    <input placeholder="Напишите сообщение..." value={message} onChange={(e) => setMessage(e.target.value)} className='conv__message-input' type="text" />
                    <img className="conv__send-msg-btn" src={sendIcon} onClick={() => sendMessage()}/>
                </div>
            </div>
        </div>
    )
}

export default ConversationPage;