import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

import { PlayNavigation } from '../navigation/play_navigation';
import { PlayTable } from './play_table';
import './play.css';

/**
 * Render the playData in a PlayTable
 * @returns {Node} - The rendered play
 */
export const Play = ({ playData }) => {
    if (!playData) {
        return null;
    }
    return (
        <Paper elevation={12} className="playGrid">
            <PlayTable playData={playData} />
            <PlayNavigation />
        </Paper>
    );
};

Play.propTypes = {
    playData: PropTypes.object.isRequired
};
