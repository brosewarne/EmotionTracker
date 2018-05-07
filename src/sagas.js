import { call, put, select, takeLatest } from 'redux-saga/effects';
import { playModelClient } from './components/play/play_model_client';


const fetchPlayData = (startIndex, stopIndex) => {
    console.log('00000', startIndex, stopIndex);
    return playModelClient.getLinesByIndex(startIndex, stopIndex).then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

function* getPlayData(startIndex, stopIndex) {
    console.log('7777777', startIndex, stopIndex);
    const playData = yield call(fetchPlayData, startIndex, stopIndex);
    console.log('111111111', playData);
    yield put({ type: 'SET_PLAY_DATA', data: playData });
}

const fetchStats = () => {
    return playModelClient.getAnalysisStats().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

const statsSelector = (state) => {
    return state.stats;
};

function* initNavigation() {
    const stats = yield select(statsSelector);
    const startIndex = stats.lastLineSeen;
    const stopIndex = startIndex + 5;
    yield put({ type: 'INIT_NAVIGATION', startIndex, stopIndex });
}

function* getStats() {
    const stats = yield call(fetchStats);
    console.log('222222222222222222222', stats);
    yield put({ type: 'SET_STATS', stats });
}

const getHeatMapData = () => {
    return playModelClient.getCharacterHeatMapData().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    });
};

const getLineChartData = () => {
    return playModelClient.getAllLineChartData().then((response) => {
        return response.data;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
    });
};

function* getAnalysedData() {
    const heatMapData = yield call(getHeatMapData);
    console.log('4444444444', heatMapData);
    yield put({ type: 'SET_HEATMAP_DATA', data: heatMapData });
    const lineChartData = yield call(getLineChartData);
    yield put({ type: 'SET_LINECHART_DATA', data: lineChartData });
}

const startStopSelector = (state) => {
    return {
        startIndex: state.navigation.startIndex,
        stopIndex: state.navigation.stopIndex
    };
};

function* initialiseState(action) {
    yield call(getStats);
    yield call(initNavigation);
    const { startIndex, stopIndex } = yield select(startStopSelector);
    yield call(getPlayData, startIndex, stopIndex);
    yield call(getAnalysedData);
}

function* updateState(action) {
    yield call(getStats);
    const { startIndex, stopIndex } = yield select(startStopSelector);
    call(getPlayData, startIndex, stopIndex);
    yield call(getAnalysedData);
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
    yield takeLatest('INITIALISE_STATE', initialiseState);
    yield takeLatest('UPDATE_STATE', updateState);
    yield takeLatest('GET_ANALYSED_DATA', getAnalysedData);
    yield takeLatest('GET_PLAY_DATA', getPlayData);
    yield takeLatest('GET_STATS', getStats);
}

export default rootSaga;
