import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Result from './pages/Result';
import Form from './pages/Form';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
