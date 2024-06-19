import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetails';
import './App.css'

const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
      </Router>
  );
};

export default App;
