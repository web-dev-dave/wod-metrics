import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import CallbackComponent from './components/CallbackComponent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthComponent />} />
        <Route path="/callback" element={<CallbackComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
