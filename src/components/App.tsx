import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import TasksPage from './TasksPage';
import FreelancersPage from './FreelancersPage';
import UserPage from './UserPage';
import ConversationPage from './ConversationPage';
import MainPage from './MainPage';
import CreateTaskPage from './CreateTaskPage';
import ConversationsPage from './ConversationsPage';
import '../css/App.css';


export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
          <Header />
            <Routes>
              <Route path="/" element={<MainPage />}/>
              <Route path="/tasks" element={<TasksPage />}/>
              <Route path="/tasks/create" element={<CreateTaskPage />}/>
              <Route path="/freelancers" element={<FreelancersPage />}/>
              <Route path="/users/:id" element={<UserPage />}/>
              <Route path="/conversation/:id" element={<ConversationPage />}/>
              <Route path="/messages" element={<ConversationsPage />}/>
            </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


