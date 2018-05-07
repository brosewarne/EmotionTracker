
const initialState = {
    totalLines: 0,
    linesAnalysed: 0,
    lastLineSeen: 0
};

/**
 * Reducer for the stats object
 * @param {Object} state - The app state for the Stats reducer
 * @param {Object} action - The action to be processed by this reducer
 * @returns {Object} - The updated state
 */
export const statsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATS': {
            return Object.assign(state, action.stats);
        }
        default: {
            return state;
        }
    }
};
