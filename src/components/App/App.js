import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import React from "react";
import Header from '../Header/Header';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';



function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Routes>
          <Route exact path='/' element={<Main />}>
          </Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
