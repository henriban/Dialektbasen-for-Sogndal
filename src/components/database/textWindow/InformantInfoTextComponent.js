import React from 'react';

class InformantInfoText extends React.Component{

    render(){

        let inf = this.props.informant;

        let cssClass = "infoText"

        if(this.props.showInformantInfo != null){
            cssClass = "infoText animationTest " + (this.props.showInformantInfo ? "animationTest2" : "animationTest");
        }

        return(
            <div className={cssClass}>
                <span>Informant: {inf.id.split("p")[0]}</span>
                <span>Opptakstidspunkt: {inf.date_of_recording} </span>
                <span>Fødd i tidbolken: {inf.birth} </span>
                <span>Alder: {inf.age} </span>
                <span>Utdanning: {inf.education} </span>
                <span>Yrke: {inf.occupation}</span>
                <span>Foreldrebakgrunn: {inf.parents_background}</span>
                <span>Type Informant: {inf.panel}</span>
            </div>
        );
    }
}

export default InformantInfoText;