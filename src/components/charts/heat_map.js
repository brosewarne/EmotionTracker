import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HeatMap } from '@nivo/heatmap';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { LoadingIcon } from '../loading_icon/loading_icon';

class CharacterHeatMap extends Component {
    static propTypes = {
        heatMapData: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.emotionNames = [
            'anger',
            'joy',
            'fear',
            'disgust',
            'sadness'
        ];
    }

    /**
     * Render a Line Chart with a title, when data is available
     * @returns {Node} - The rendered Line Chart and title
     */
    render = () => {
        if (!this.props.heatMapData.length) {
            return <LoadingIcon label="Loading Heat Map" />;
        }
        return (
            <Paper elevation={12}>
                <Typography align="center" variant="subheading">
                    Total Character Emotions
                </Typography>
                <HeatMap
                    data={this.props.heatMapData}
                    keys={this.emotionNames}
                    indexBy="character"
                    height={600}
                    width={600}
                    margin={{
                        top: 60,
                        right: 60,
                        bottom: 60,
                        left: 60
                    }}
                    forceSquare
                    axisTop={{
                        orient: 'top',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -90,
                        legend: '',
                        legendOffset: 36
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0
                    }}
                    cellOpacity={1}
                    cellBorderColor="inherit:darker(0.4)"
                    labelTextColor="inherit:darker(1.8)"
                    defs={[
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: 'rgba(0, 0, 0, 0.1)',
                            rotation: -45,
                            lineWidth: 4,
                            spacing: 7
                        }
                    ]}
                    fill={[
                        {
                            id: 'lines'
                        }
                    ]}
                    animate
                    motionStiffness={80}
                    motionDamping={9}
                    hoverTarget="cell"
                    cellHoverOthersOpacity={0.25}
                />
            </Paper>
        );
    };
}

export { CharacterHeatMap };
