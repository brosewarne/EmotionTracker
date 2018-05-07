import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Play } from '../play/play';
import { PlayHeader } from '../header/play_header';
import { LineChart } from '../charts/line_chart';
import { CharacterHeatMap } from '../charts/heat_map';

import './pages.css';

class _HomePage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        stats: PropTypes.object.isRequired,
        lineChartData: PropTypes.object.isRequired,
        heatMapData: PropTypes.object.isRequired,
        playData: PropTypes.object.isRequired
    };

    /**
     * Initialise the state from the server when the HomePage mounts
     */
    componentWillMount = () => {
        this.props.dispatch({ type: 'INITIALISE_STATE' });
    };

    /**
     * Render the Home page
     * @returns {Node} - The Home page
     */
    render() {
        return (
            <Fragment>
                <PlayHeader stats={this.props.stats} />
                <Play playData={this.props.playData} />
                <div className="chartContainer" >
                    <div className="lineChart">
                        <LineChart lineChartData={this.props.lineChartData} />
                    </div>
                    <div className="heatMap">
                        <CharacterHeatMap heatMapData={this.props.heatMapData} />
                    </div>
                </div>
            </Fragment>

        );
    }
}

/**
 * Map the stats and chart data from state
 * @param {Object} state - the current app state
 * @returns {Object} - The mapped props
 */
const mapStateToProps = (state) => {
    return {
        stats: state.stats,
        heatMapData: state.data.heatMapData,
        lineChartData: state.data.lineChartData,
        playData: state.data.playData
    };
};

export const HomePage = connect(mapStateToProps)(_HomePage);
