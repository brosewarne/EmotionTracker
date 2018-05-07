import React from 'react';
import PropTypes from 'prop-types';

import loading from './loading.svg';
import './loading_spinner.css';

/**
 * Create a loading Image with text.
 * @returns {Node} - The loading image and text
 */
export const LoadingIcon = ({ label }) => {
    return (
        <div>
            <h3>
                {label}
            </h3>
            <div>
                <img src={loading} className="loadingSpinner" alt="loading" />
            </div>
        </div>
    );
};

LoadingIcon.propTypes = {
    label: PropTypes.string.isRequired
};
