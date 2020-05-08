import React, { useState, useEffect } from 'react';
import Sidebar from './General/Sidebar/Sidebar';
import './App.css';
import './Calibre/calibre.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  Redirect
} from 'react-router-dom';
import Header from './General/Header/Header';
import Map from './Map/Map';
import Locatie from './Locatie/Locatie';
import Register from './Register/Register';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';

const NotFound = () => {
  return (
    <div style={{ padding: '1em' }}>
      <h2>Error 404: Not Found</h2>
    </div>
  );
};

const App = () => {
  const [sidebar, setSidebar] = useState(false);
  // const [user, setUser] = useState(null);

  const openSidebar = () => {
    setSidebar(!sidebar);
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
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
