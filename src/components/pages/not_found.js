import React from 'react';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

import './pages.css';

/**
 * Render the 404 Page
 * @returns {Node} - The rendered 404 Page
 * @constructor
 */
export const NotFound = () => {
    return (
        <div>
            <content className="pageContainer">
                <Paper elevation={12}>
                    <Typography color="primary" className="appHeader" align="center" >
                        <h1>Sorry we couldn;t find the page you're looking for :(</h1>
                    </Typography>
                </Paper>
            </content>
        </div>
    );
};
