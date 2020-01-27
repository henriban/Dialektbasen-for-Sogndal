import React from 'react';

import '../styles/errorPage.scss';


const InternetExplorerError = () => (
    <div className="errorPage">
        <img src="logo_gjennomsiktig.png" alt="dialektbasen_logo" />
        <p>Denne sida støttar ikkje Internett Explorer. Vel i staden <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.mozilla.org/en-US/firefox/new/">Firefox</a> eller <a href="https://www.microsoft.com/en-us/edge">Edge</a></p>
    </div> 
);

export default InternetExplorerError;