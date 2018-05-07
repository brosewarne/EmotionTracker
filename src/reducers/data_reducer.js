
const initialState = {
    heatMapData: [],
    lineChartData: [],
    playData: []
};

/**
 * Reducer for the heatmap, linechart and play data
 * @param {Object} state - The app state for the Data reducer
 * @param {Object} action - The action to be processed by this reducer
 * @returns {Object} - The updated state
 */
export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HEATMAP_DATA': {
            return Object.assign({}, state, { heatMapData: action.data });
        }
        case 'SET_LINECHART_DATA': {
            return Object.assign({}, state, { lineChartData: action.data });
        }
        case 'SET_PLAY_DATA': {
            return Object.assign({}, state, { playData: action.data });
        }
        default: {
            return state;
        }
    }
};
