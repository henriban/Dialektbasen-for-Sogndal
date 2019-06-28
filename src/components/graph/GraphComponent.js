import React from 'react';
import { VictoryGroup, VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
  
class graph extends React.Component{

    formatTickFormat(){
        let ticketFormat = this.props.tickFormat;
        let newTicketFormat = [];

        if(ticketFormat !== undefined && ticketFormat.length > 0){
            if(ticketFormat[0].split(" ").length > 2 ){

                for(let i = 0; i < ticketFormat.length; i++){
                    let text = ticketFormat[i];

                    let newTicket = text.slice(0, text.split(" ")[0].length) + "\n" + text.slice(text.split(" ")[0].length);
                    newTicketFormat.push(newTicket);
                }
            }else{
                return ticketFormat;
            }
        }
        return newTicketFormat;
    }

    getVerticalTickValue(){
        let highestValue = 0;
        this.props.data.map(data => data.map(value => highestValue = value.y > highestValue ? value.y : highestValue));

        if(highestValue < 3){
            return [0, 1, 2]
        }
        else if(highestValue < 2){
            return [0, 1, 2]
        }

        return [highestValue]
    }

    render() {
        let key = 0;

        return (
            <div className="graph">
                <p className="graphLabel">{this.props.title}</p>
                <div className="graphColorExplanation">
                    <div className="colorExplanation explanation1"/> <span>{this.props.explanation1} </span>
                    <div className="colorExplanation explanation2"/> <span>{this.props.explanation2} </span>
                    <div className="colorExplanation explanation3"/> <span>anna</span>

                </div>
                <VictoryChart domainPadding={50}>

                    <VictoryLabel>

                    </VictoryLabel>
                    {/* Generate bar charts from number of different variables (items in data list)*/}
                    <VictoryGroup offset={20} colorScale={["#4AACC5", "#77a033", "#e07676"]}>

                        {this.props.data.map(data => {
                            return(<VictoryBar key={key++} data={data} animate={{ duration: 500 }} style={{data: { width: 12 }}}/>);
                        })}
                    </VictoryGroup>
                    <VictoryAxis tickValues={this.props.tickValues} tickFormat={this.formatTickFormat()}/>
                    <VictoryAxis dependentAxis tickValues={this.getVerticalTickValue()} tickFormat={(tick) => `${Math.round(tick)}`}/>

                </VictoryChart>
                <br/>
                <br/>
            </div>
        );
    }
}

export default graph;    