import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from '@nivo/line';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { LoadingIcon } from '../loading_icon/loading_icon';

class LineChart extends Component {
    static propTypes = {
        lineChartData: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.tickInterval = 10;
    }

    /**
     * Get the x axis tick values - by defult, show every tenth tick from the start index
     * @returns {Array} - The array of x axis chart ticks
     */
    getXTickValues = () => {
        const xLen = this.props.lineChartData[0].data.length;
        const xMin = this.props.lineChartData[0].data[0].x;
        const xMax = this.props.lineChartData[0].data[xLen - 1].x;
        const numTicks = Math.ceil((xMax - xMin) / this.tickInterval);
        const ticks = [];
        for (let i = 0; i < numTicks; i++) {
            ticks.push((i * this.tickInterval) + xMin);
        }
        return ticks;
    };

    /**
     * Render a HeatMap with a title, when data is available
     * @returns {Node} - The rendered Line Chart and title
     */
    render = () => {
        if (!this.props.lineChartData.length) {
            return <LoadingIcon label="Loading Heat Map" />;
        }
        return (
            <Paper elevation={12}>
                <Typography align="center" variant="subheading">
                    Emotion Over Time
                </Typography>
                <Line
                    data={this.props.lineChartData}
                    width={1200}
                    height={600}
                    margin={{
                        top: 50,
                        right: 110,
                        bottom: 50,
                        left: 60
                    }}
                    dotSize={0}
                    minY="auto"
                    curve="natural"
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 0,
                        tickPadding: 0,
                        tickRotation: 0,
                        tickValues: this.getXTickValues(),
                        legend: 'Line Number',
                        legendOffset: 36,
                        legendPosition: 'center'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'count',
                        legendOffset: -40,
                        legendPosition: 'center'
                    }}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            translateX: 100,
                            itemWidth: 80,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: 'circle'
                        }
                    ]}
                />
            </Paper>
        );
    };
}

export { LineChart };

