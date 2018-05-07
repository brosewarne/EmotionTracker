import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

class _PlayNavigation extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    /**
     * Update the state to show the first five pages
     */
    goToStart = () => {
        this.props.dispatch({ type: 'SET_NAVIGATION', value: 'start' });
        this.props.dispatch({ type: 'UPDATE_STATE' });
    };

    /**
     * Update the state to show the last five pages
     */
    goToEnd = () => {
        this.props.dispatch({ type: 'SET_NAVIGATION', value: 'end' });
        this.props.dispatch({ type: 'UPDATE_STATE' });
    };

    /**
     * Update the state to show the previous five pages
     */
    goBack = () => {
        this.props.dispatch({ type: 'SET_NAVIGATION', value: 'back' });
        this.props.dispatch({ type: 'UPDATE_STATE' });
    };

    /**
     * Update the state to show the next five pages
     */
    goForward = () => {
        this.props.dispatch({ type: 'SET_NAVIGATION', value: 'forward' });
        this.props.dispatch({ type: 'UPDATE_STATE' });
    };

    /**
     * Render the navigation menu
     * @returns {Node} - The navigation menu
     */
    render = () => {
        return (
            <Paper position="static">
                <Button variant="raised" onClick={this.goToStart}>
                    {'<<'}
                </Button>
                <Button variant="raised" onClick={this.goBack}>
                    {'<'}
                </Button>
                <Button variant="raised" onClick={this.goForward}>
                    {'>'}
                </Button>
                <Button variant="raised" onClick={this.goToEnd}>
                    {'>>'}
                </Button>
            </Paper>
        );
    };
}

export const PlayNavigation = connect()(_PlayNavigation);

