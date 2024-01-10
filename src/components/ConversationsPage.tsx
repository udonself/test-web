import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../config';
import useAxiosHeader from '../customHooks/useAxiosHeader';
import { ConversationInfoModel } from '../models/ConversationInfo';
import ConversationInfo from './ConversationInfo';
import '../css/ConversationsPage.css';


const ConversationsPage = () => {
    const header = useAxiosHeader();
    const [conversations, setConversations] = useState<ConversationInfoModel[] | null>(null);

    useEffect(() => {
        if(!header) return;
        let categoriesApiUrl = `${API_BASE_URL}/messages/conversations`;
        axios.get(categoriesApiUrl, {headers: header})
          .then(function (response) {
            setConversations(response.data);
            console.log(response.data);
        })
          .catch(function (error) {
            //
        })
      }, [header]);

    return(
        <div className="conversations-page container" >
           <div className="conversations-wrapper">
                <h1 className='conversations-wrapper__title'>Ваши переписки</h1>
                {
                    conversations ?
                        conversations.map(conv => <ConversationInfo {...conv}/>)
                    : ''
                }
           </div>
        </div>
    )
}

export default ConversationsPage;