import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TasksPage from './TasksPage';
import Header from './Header';
import Footer from './Footer';
import '../css/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/">
          <Header />
            <Routes>
              <Route path="/" />
              <Route path="/tasks" element={<TasksPage />}/>
            </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
