import React, { Component } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './../../assets/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      sidebar: false
    };

    window.addEventListener('resize', this.update);
  }

  update = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  openSidebar = () => {
    this.props.openSidebar();
    this.setState({ sidebar: !this.state.sidebar });
  };

  message = (event) => {
    event.preventDefault();
    alert('Nu am implementat asta inca!');
  };

  render() {
    let mobileHeader = false;
    if (this.state.width <= 630) {
      mobileHeader = true;
    }

    let route = window.location.pathname.substr(1);
    route = route.charAt(0).toUpperCase() + route.slice(1);
    if (route.includes('Locatie')) route = 'Locatie';

    let form = (
      <div className="searchbar">
        <form onSubmit={this.message}>
          <input type="text" placeholder="Caută o locatie" />
          <button type="submit">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faSearch} className="icon" />
            </div>
          </button>
        </form>
      </div>
    );

    return (
      <div className="header-wrapper">
        <header>
          <div className="hamburger-wrapper" onClick={this.openSidebar}>
            <FontAwesomeIcon
              icon={this.state.sidebar ? faTimes : faBars}
              className="hamburger"
            />
          </div>

          <div className="title">
            <h1>
              <img src={logo} alt="Ro" className="logo" />
              Locatii<span>.ro</span>
            </h1>
          </div>
          <div className="page-title">
            <h1>{route}</h1>
          </div>
          {!mobileHeader ? (
            form
          ) : (
            <div className="hamburger-wrapper" style={{ visibility: 'hidden' }}>
              <FontAwesomeIcon icon={faBars} className="hamburger" />
            </div>
          )}
        </header>

        <div className="mobile-header">
          <div className="page-title page-title-mobile">
            <h1>{route}</h1>
          </div>
          {mobileHeader ? form : ''}
        </div>
      </div>
    );
  }
}

export default Header;
