import React from 'react';
import {VictoryLegend, VictoryGroup, VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
  
class graph extends React.Component{

    render() {
        let key = 0;

        return (
            <div className="graph">
                <p className="graphLabel">{this.props.title}</p>

                <VictoryChart domainPadding={{x: 50}} /*animate={{duration: 300}}*/>

                    <VictoryLabel>
                    <VictoryLegend x={150} y={100}
                                   orientation="horizontal"
                                   gutter={20}
                                   data={[
                                       { name: "One" },
                                       { name: "Two" },
                                       { name: "Anna" }
                                   ]}
                    />
                    </VictoryLabel>
                    {/* Generate bar charts from number of different variables (items in data list)*/}
                    <VictoryGroup offset={20} colorScale={["#4AACC5", "#77a033", "#e07676"]}>

                        {this.props.data.map(data => {
                            return(<VictoryBar key={key++} data={data} />);
                        })}
                    </VictoryGroup>
                    <VictoryAxis tickValues={this.props.tickValues} tickFormat={this.props.tickFormat}/>
                    <VictoryAxis dependentAxis tickFormat={(tick) => `${Math.round(tick)}`}/>
                </VictoryChart>
            </div>
        );
    }
}

export default graph;    