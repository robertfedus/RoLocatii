import React from 'react';

const Logout = () => {
  document.cookie = 'name=';
  document.cookie = 'email=';
  document.cookie = 'jwt=';
  window.location.href = `${window.location.origin}/`;

  return <div>Te deconectam...</div>;
};

export default Logout;
