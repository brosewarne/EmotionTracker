import { call, put, select, takeLatest } from 'redux-saga/effects';
import { playModelClient } from './components/play/play_model_client';

/**
 * Get the play data for a given startIndex and stopIndex from the server
 * @param {Number} startIndex - The startIndex for the play data
 * @param {Number} stopIndex - The stopIndex for the play data
 * @returns {Promise} - A Promise that will be resolved when the api call has completed
 */
const fetchPlayData = (startIndex, stopIndex) => {
    return playModelClient.getLinesByIndex(startIndex, stopIndex).then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

/**
 * Get the play data for the given startIndex and stopIndex and put it on the redux state
 * @param {Number} startIndex - The startIndex for the play data
 * @param {Number} stopIndex - The stopIndex for the play data
 */
function* getPlayData(startIndex, stopIndex) {
    const playData = yield call(fetchPlayData, startIndex, stopIndex);
    yield put({ type: 'SET_PLAY_DATA', data: playData });
}

/**
 * Get the analysied stats
 * @returns {Promise} - A Promise that will be resolved when the api call has completed
 */
const fetchStats = () => {
    return playModelClient.getAnalysisStats().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

/**
 * Selector that returns the current stats object
 * @param {Object} state - The current redux state
 * @returns {Object} - The current stats object from state
 */
const statsSelector = (state) => {
    return state.stats;
};

/**
 * Initialise the navigation state - start and stop indicies
 */
function* initNavigation() {
    const stats = yield select(statsSelector);
    const startIndex = stats.lastLineSeen;
    const stopIndex = startIndex + 5;
    yield put({ type: 'INIT_NAVIGATION', startIndex, stopIndex });
}

/**
 * Get the stats data for the analysied data
 */
function* getStats() {
    const stats = yield call(fetchStats);
    yield put({ type: 'SET_STATS', stats });
}

/**
 * Get the heatMap data set
 * @returns {Promise} - A Promise that will be resolved when the api call has completed
 */
const fetchHeatMapData = () => {
    return playModelClient.getCharacterHeatMapData().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    });
};

/**
 * Get the lineChart data set
 * @returns {Promise} - A Promise that will be resolved when the api call has completed
 */
const fetchLineChartData = () => {
    return playModelClient.getAllLineChartData().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

/**
 * Get the current plat, heatMap and chartData
 */
function* getAnalysedData() {
    const heatMapData = yield call(fetchHeatMapData);
    yield put({ type: 'SET_HEATMAP_DATA', data: heatMapData });
    const lineChartData = yield call(fetchLineChartData);
    yield put({ type: 'SET_LINECHART_DATA', data: lineChartData });
}

/**
 * Get the current start and stop values from state
 * @param {Object} state - The redux state
 * @returns {Object} - Object containing the start and stop indicies
 */
const startStopSelector = (state) => {
    return {
        startIndex: state.navigation.startIndex,
        stopIndex: state.navigation.stopIndex
    };
};

/**
 * Initialise the state, with navigation, stats and data
 */
function* initialiseState() {
    yield call(getStats);
    yield call(initNavigation);
    const { startIndex, stopIndex } = yield select(startStopSelector);
    yield call(getPlayData, startIndex, stopIndex);
    yield call(getAnalysedData);
}

/**
 * Update the state, with navigation, stats and data
 */
function* updateState() {
    yield call(getStats);
    const { startIndex, stopIndex } = yield select(startStopSelector);
    call(getPlayData, startIndex, stopIndex);
    yield call(getAnalysedData);
}

/**
 * The rootSaga
 */
function* rootSaga() {
    yield takeLatest('INITIALISE_STATE', initialiseState);
    yield takeLatest('UPDATE_STATE', updateState);
    yield takeLatest('GET_ANALYSED_DATA', getAnalysedData);
    yield takeLatest('GET_PLAY_DATA', getPlayData);
    yield takeLatest('GET_STATS', getStats);
}

export default rootSaga;
