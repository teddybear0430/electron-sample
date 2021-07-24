import React from 'react';
import AppHeader from './components/AppHeader';
require('./styles/index.scss');

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <p>Hello Electron!</p>
    </>
  );
};

export default App;
