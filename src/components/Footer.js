import React from 'react';
import '../styles/footer.scss';

class Footer extends React.Component{

    render(){
        return(
            <div className="footerWrapper">
                <p>
                    Kontaktinformasjon: <br/>
                    Fagleg ansvarleg for dialektbasen: Ragnhild Lie Anderson <br/>
                    <a href="https://www.uib.no/personer/Ragnhild.Lie.Anderson">www.uib.no/personer/Ragnhild.Lie.Anderson</a> <br/>
                    E-post: ragnhild.anderson@uib.no <br/>
                    <br/>
                    Digital utviklar og tilretteleggjar: <br/>
                    Henrik Bjelke Anderson <br/>
                    <br/>
                    Logo: <br/>
                    Ida Torkildsen
                </p>
            </div>
        );
    }
}

export default Footer;
