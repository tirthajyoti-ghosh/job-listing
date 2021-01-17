/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

const SideNav = () => (
  <div className="sidenav">
    <a href="/" className="logo"><img src="https://user-images.githubusercontent.com/57726348/104851251-f71f2500-5919-11eb-907b-1fd77e6f7bb7.png" alt="logo" /></a>

    <section className="nav-items">
      <a href="#">Home</a>
      <NavLink exact to="/jobs" activeClassName="active">Search Job</NavLink>
      <NavLink exact to="/talents" activeClassName="active">Find Talent</NavLink>
      <a href="#">Community</a>
      <a href="#">More</a>
    </section>

    <a href="#" style={{ marginBottom: '50%' }}>Login</a>
  </div>
);

export default SideNav;
