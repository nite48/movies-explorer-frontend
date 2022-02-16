import React from "react";
import Header from '../Header/Header';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from "../Login/Login";



function App() {
  return (
      <div className="page">
        <Header />
        <Switch>
          <Route exact path='/' >
            <Main />
          </Route>
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
        </Switch>
        <Footer/>
      </div>
  );
}

export default App;
