import React from 'react';

import { NavLink } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => (
    <div className="navbar">
        <NavLink className="item" to="/" exact>Heim</NavLink>
        <NavLink className="item" to="/sosiolingvistikk">Kva er sosiolingvistikk?</NavLink>
        <NavLink className="item" to="/database">Database</NavLink>
        <NavLink className="item" to="/graf">Graf</NavLink>
    </div> 
);

export default Navbar;