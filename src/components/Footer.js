import React from 'react';
import '../styles/footer.scss';

class Footer extends React.Component{

    render(){
        return(
            <div className="footerWrapper">
                <div className="footerContent">
                    <div>
                        <b>Kontaktinformasjon:</b><br/>
                        Fagleg ansvarleg for dialektbasen: Ragnhild Lie Anderson <br/>
                        <a href="https://www.uib.no/personer/Ragnhild.Lie.Anderson">www.uib.no/personer/Ragnhild.Lie.Anderson</a> <br/>
                        E-post: ragnhild.anderson@uib.no <br/>
                    </div>
                    <div>
                        <b>Digital utviklar og tilretteleggjar:</b> <br/>
                        Henrik Bjelke Anderson <br/>
                        <br/>
                        <b>Logo:</b> <br/>
                        Ida Torkildsen
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
