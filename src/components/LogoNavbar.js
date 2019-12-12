import React from 'react';

import { NavLink, Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => (
    <div className="navbar">
        <Link className="item" to="/" exact>
            <img className="navbar-logo" src="logo_gjennomsiktig.png" alt="sogndal_by_night" />
        </Link>
        <NavLink className="item" to="/sosiolingvistikk">Kva er sosiolingvistikk?</NavLink>
        <NavLink className="item" to="/database">Database</NavLink>
        <NavLink className="item" to="/graf">Graf</NavLink>
    </div> 
);

export default Navbar;