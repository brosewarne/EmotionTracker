import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import { LoadingIcon } from '../loading_icon/loading_icon';

import { playModelClient } from './play_model_client';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    }
});

class _PlayTable extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        playData: PropTypes.object.isRequired
    };

    /**
     * Get the emotion with the highest score for a line number
     * @param {Object} nluResult - The natural language understanding result with emotion scores
     * @returns {String} - The emotion with the highest score for the supplied nluResult
     */
    getStrongestEmotion = (nluResult) => {
        if (!nluResult) {
            return 'N/A';
        }
        const { emotion } = nluResult.emotion.document;
        return Object.entries(emotion).sort((a, b) => { return b[1] - a[1]; })[0][0];
    };

    /**
     * Get the TableRows for the play table
     * @returns {Array} - An array of TableRow nodes to add to the PlayTable
     */
    getTableRows = () => {
        return Object.values(this.props.playData).map((lineResult) => {
            const { playData, nluResult } = lineResult;
            const strongestEmotion = this.getStrongestEmotion(nluResult);
            return (
                <TableRow key={playData.line_id}>
                    <TableCell>{playData.line_number}</TableCell>
                    <TableCell>{playData.speaker}</TableCell>
                    <TableCell>{playData.text_entry}</TableCell>
                    <TableCell>{strongestEmotion.toUpperCase()}</TableCell>
                    <TableCell><img alt="joy" src={`/images/${strongestEmotion}.png`} width="32" height="32" /></TableCell>
                </TableRow>
            );
        });
    };

    /**
     * Rendetr the PlayTable
     * @returns {Node} - The rendered PlayTable if data is available, otherwise, show a loading icon
     */
    render = () => {
        if (!Object.keys(this.props.playData).length) {
            return <LoadingIcon label="Loading Play" />;
        }

        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Line Number</TableCell>
                            <TableCell>Character</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Strongest Emotion</TableCell>
                            <TableCell>Emoji</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.getTableRows()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export const PlayTable = withStyles(styles)(_PlayTable);
