import React from 'react';

import { NavLink, Link } from 'react-router-dom';
import '../styles/navbar.scss';

const Navbar = () => (
    <div className="navbar-logo">
        <div className="navbar-logo-images">
            <a href="https://www.uib.no/lle">
                <img className="uib-logo" src="UiB_emblem.png" alt="uib_logo" />
            </a>
            <div className="logo-divider"></div>
            <Link to="/" exact="true">
                <img className="dialektbasen-logo" src="logo_gjennomsiktig.png" alt="dialektbasen_logo" />
                {/* <img className="dialektbasen_logo" src="logo_gjennomsiktig_landskap.png" alt="dialektbasen_logo" /> */}
                {/* <img className="dialektbasen_logo" src="logo_gjennomsiktig_kort.png" alt="dialektbasen_logo" /> */}
            </Link>
        </div>
        <div className="navbar-logo-items">
            <NavLink className="item" to="/" exact>Heim</NavLink>
            <NavLink className="item" to="/sosiolingvistikk">Kva er sosiolingvistikk?</NavLink>
            <NavLink className="item" to="/database">Database</NavLink>
            <NavLink className="item" to="/graf">Graf</NavLink>
        </div>
    </div> 
);

export default Navbar;