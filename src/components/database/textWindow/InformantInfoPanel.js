import React from 'react';

import InformantInfoText from './InformantInfoTextComponent';

import '../../../styles/database/informantInfoPanel.scss';

class InformantInfoPanel extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            showSecondInf: false,
            showInformantPanel: true
        }
    }

    toggleShowInformantPanel(){
        this.setState({ showInformantPanel: !this.state.showInformantPanel})
    }

    onSecondInfClick(e){
        this.setState({ showSecondInf: !this.state.showSecondInf});
    }

    showSecondInformer(showSecondInf) {
        return <div className="secondInfPanel" onClick={() => this.onSecondInfClick()}>
            <span><b>{this.props.inf2.id.split("p")[0]}: {this.props.inf2.age.split(" ")[0]} {this.props.inf2.gender.toLowerCase()} frå {this.props.inf2.place}</b></span>
            <InformantInfoText informant={this.props.inf2} showInformantInfo={showSecondInf}/>
        </div>
    }

    render(){
        let cssClass = "informantInfoPanelWrapper informantInfoPanelWrapperAnimationStart " + (this.state.showInformantPanel ? "informantInfoPanelWrapperAnimationEnd" : "");
        
        return(
            <div className="informantInfoPanel">
                <div className={cssClass}>
                    <h2 id="headline">{this.props.inf1.age.split(" ")[0]} {this.props.inf1.gender.toLowerCase()} frå {this.props.inf1.place}</h2>
                    <InformantInfoText informant={this.props.inf1}/>

                    {this.props.inf2 != null ? this.showSecondInformer(this.state.showSecondInf) : null}
                </div>
                {/* <button className="informantInfoPanelHideButton" onClick={this.toggleShowInformantPanel.bind(this)}>
                    { this.state.showInformantPanel && <img src="./back.svg" alt="#" width="10"/>}
                    { !this.state.showInformantPanel && <img src="./next.svg" alt="#" width="10"/>}
                </button> */}
            </div>
        )
    }
}

export default InformantInfoPanel