import React from 'react';
import { Link } from 'react-router-dom';

import { ConversationInfoModel } from '../models/ConversationInfo';
import '../css/ConversationInfo.css';


const ConversationInfo: React.FC<ConversationInfoModel> = ({companion_id, companion_username, companion_avatar, last_message, last_date}) => {
    
    const resolveContent = (message: string) => {
        if (message.length < 17) return message;
        return message.substring(0, 17) + '...';
    }
    
    return (
        <Link to={`/conversation/${companion_id}`} className="conversation-info">
            <div className="conversation-info__column userinfo-column">
                <img className='conversation-info__avatar' src={companion_avatar} alt="companion avatar" />
                <div className="conversation-info__description">
                    <h1 className="conversation-info__username">{companion_username}</h1>
                    <span className="conversation-info__last_message">{resolveContent(last_message)}</span>
                </div>
            </div>
            <div className="conversation-info__column">
                <span className="conversation-info__last_date">{last_date}</span>
            </div>
        </Link>
    )
}

export default ConversationInfo;