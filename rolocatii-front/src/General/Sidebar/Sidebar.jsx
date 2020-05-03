import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMapMarkedAlt,
  faMapPin,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import getCookie from './../../getCookie';

const Sidebar = (props) => {
  const anchors = [
    'Harta',
    'Locatie',
    'Profil',
    'Deconectare',
    'Intră în cont',
    'Cont nou'
  ];

  const icons = [
    faMapMarkedAlt,
    faMapPin,
    faUser,
    faSignOutAlt,
    faSignInAlt,
    faUserPlus
  ];
  const path = window.location.pathname.substr(1);
  const pathUnchanged = window.location.pathname;
  let logged;
  if (getCookie('jwt')) logged = true;
  else logged = false;

  const list = icons.map((el, index) => {
    let liClass = '';
    let bullet;
    if (
      path === anchors[index].toLowerCase() ||
      (pathUnchanged === '/' && anchors[index] === 'Harta')
    ) {
      liClass = 'active';
      bullet = <span className="bullet">&bull;</span>;
    }

    let link;

    if (logged) {
      link = `${window.location.origin}/${anchors[index].toLowerCase()}`;
      if (index === 4 || index === 5) return undefined;
    } else {
      if (index === 0)
        link = `${window.location.origin}/${anchors[index].toLowerCase()}`;
      else if (index === 4) {
        link = `${window.location.origin}/logare`;
      } else if (index === 5) {
        link = `${window.location.origin}/inregistrare`;
      } else return undefined;
    }

    return (
      <a href={link}>
        <li
          className={
            path === anchors[index].toLowerCase() ||
            (pathUnchanged === '/' && anchors[index] === 'Harta') ||
            (path === 'logare' && index === 4) ||
            (path === 'inregistrare' && index === 5)
              ? 'active'
              : ''
          }
        >
          <div style={{ display: 'flex' }}>
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={el} className="icon" />
            </div>
            <a href={link}>{anchors[index]}</a>
          </div>

          <div className="separator">{bullet ? bullet : ''}</div>
        </li>
      </a>
    );
  });

  let sidebarClasses = 'sidebar';
  if (props.opened) {
    sidebarClasses = sidebarClasses.concat(' opened');
  }

  return (
    <div className={sidebarClasses}>
      <div className="image">
        <img src="https://image.flaticon.com/icons/svg/747/747376.svg" alt="" />
      </div>
      <span>{getCookie('jwt') ? getCookie('name') : 'Vizitator'}</span>
      <ul>{list}</ul>
    </div>
  );
};

export default Sidebar;
