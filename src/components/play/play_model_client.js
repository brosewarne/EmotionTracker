import axios from 'axios';

// @todo, merge this with Sagas, I had different plans for this originally
class PlayModelClient {
    getLinesByIndex = (startIndex, stopIndex) => {
        return axios.get(`http://localhost:3001/getResultsForRange?startIndex=${startIndex}&stopIndex=${stopIndex}`);
    };

    getAllLineChartData = () => {
        return axios.get('http://localhost:3001/getLineChartData');
    };

    getCharacterHeatMapData = () => {
        return axios.get('http://localhost:3001/getCharacterHeatMapData');
    };

    getAnalysisStats = () => {
        return axios.get('http://localhost:3001/getAnalysisStats');
    }
}

export const playModelClient = new PlayModelClient();
