import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { statsReducer } from './reducers/stats_reducer';
import { dataReducer } from './reducers/data_reducer';
import { navigationReducer } from './reducers/navigation_reducer';

export default combineReducers({
    routing: routerReducer,
    stats: statsReducer,
    data: dataReducer,
    navigation: navigationReducer
});
