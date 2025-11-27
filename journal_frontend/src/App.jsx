import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainNavBar from './MainNavBar';

export default function App() {
  return (
    <BrowserRouter>
      <MainNavBar />
    </BrowserRouter>
  );
}
