import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import './header.css';


class Header extends Component {
    /**
     * Returns a Header AppBar component.
     * @returns {Node} - The header App Bar
     */
    render = () => {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography color="primary" className="appHeader" align="center">
                        <Link to="/" href="/">
                            <h1 className="appTitle">Emotion Tracker - Henry IV</h1>
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    };
}

export { Header };
