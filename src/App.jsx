
import React, { useState, useEffect } from 'react';
import './App.css';
// import './css/App.css'
// import './css/MovieSelectionModal.css'
import MovieForm from './components/SearchComponent';

function App() {
  const [state, setState] = useState('');

  return (
    <>
      <MovieForm />
    </>)
}

export default App
