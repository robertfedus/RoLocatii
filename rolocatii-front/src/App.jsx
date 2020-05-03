import React, { useState, useEffect } from 'react';
import Sidebar from './General/Sidebar/Sidebar';
import './App.css';
import './Calibre/calibre.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import Header from './General/Header/Header';
import Map from './Map/Map';
import Locatie from './Locatie/Locatie';
import Register from './Register/Register';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';

const App = () => {
  const limit = 0;
  const [sidebar, setSidebar] = useState(false);
  // const [user, setUser] = useState(null);

  const openSidebar = () => {
    setSidebar(!sidebar);
  };

  let user = 'hah';
  const updateContext = (value) => {
    return value;
  };

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Sidebar opened={sidebar} />
          <main>
            <Header openSidebar={openSidebar} />
            <Switch>
              <Route path="/" component={Map} exact />
              <Route path="/harta" component={Map} exact />
              <Route path="/locatie" component={Locatie} />
              <Route path="/inregistrare" component={Register} exact />
              <Route path="/logare" component={Login} exact />
              <Route path="/deconectare" component={Logout} exact />
              <Route path="/profil" component={Profile} exact />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
