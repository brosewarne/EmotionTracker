import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import './header.css';

/**
 * Return a header that shows the number of line analysed
 * @param {Object} stats - the stats object from state.stats
 * @returns {Node} - The stats header
 */
export const PlayHeader = ({ stats }) => {
    return (
        <Paper position="static">
            <Typography variant="headline" align="center">
                {stats.linesAnalysed} of {stats.totalLines} Lines Analysed
            </Typography>

        </Paper>
    );
};

PlayHeader.propTypes = {
    stats: PropTypes.object.isRequired
};

