
const initialState = {
    startIndex: 10,
    stopIndex: 15
};

/**
 * Reducer for the start and stop indicies
 * @param {Object} state - The app state for the Navigation reducer
 * @param {Object} action - The action to be processed by this reducer
 * @returns {Object} - The updated state
 */
export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_NAVIGATION': {
            const { startIndex, stopIndex } = action;
            return Object.assign({}, state, { startIndex, stopIndex });
        }
        case 'SET_NAVIGATION': {
            switch (action.value) {
                case 'start': {
                    return Object.assign({}, state, { startIndex: 0, stopIndex: 5 });
                }
                case 'end': {
                    // @todo fix this
                    return Object.assign({}, state, { startIndex: state.startIndex - 5, stopIndex: state.stopIndex - 5 });
                }
                case 'back': {
                    return Object.assign({}, state, { startIndex: state.startIndex - 5, stopIndex: state.stopIndex - 5 });
                }
                case 'forward': {
                    return Object.assign({}, state, { startIndex: state.startIndex + 5, stopIndex: state.stopIndex + 5 });
                }
                default: {
                    return state;
                }
            }
        }
        case 'SET_LINECHART_DATA': {
            return Object.assign({}, state, { lineChartData: action.data });
        }
        default: {
            return state;
        }
    }
};
