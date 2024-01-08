import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import TasksPage from './TasksPage';
import FreelancersPage from './FreelancersPage';
import UserPage from './UserPage';
import '../css/App.css';


export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
          <Header />
            <Routes>
              <Route path="/" />
              <Route path="/tasks" element={<TasksPage />}/>
              <Route path="/freelancers" element={<FreelancersPage />}/>
              <Route path="/users/:id" element={<UserPage />}/>
            </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}


