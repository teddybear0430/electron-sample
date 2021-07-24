import React from 'react';
import AppHeader from './components/AppHeader';
import Router from './Router';

require('./styles/index.scss');

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <Router />
    </>
  );
};

export default App;
