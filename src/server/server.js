const express = require('express');
const cors = require('cors');

const playModel = require('./play_model').playModel;

const app = express();
app.use(cors());

app.get('/getResultsForRange', function (req, res) {
    const { startIndex, stopIndex } = req.query;
    const p = playModel.getEmotionForLines(parseInt(startIndex), parseInt(stopIndex));
    p.then((result) => {
        res.send(JSON.stringify(result));
    });
});

app.get('/getLineChartData', function(req, res) {
    const data = playModel.getLineChartData();
    res.send(JSON.stringify(data));
});

app.get('/getCharacterHeatMapData', function(req, res) {
    const data = playModel.getCharacterHeatMapData();
    res.send(JSON.stringify(data));
});

app.get('/getCharacterNames', function(req, res) {
    const data = playModel.getAllCharacterNames();
    res.send(JSON.stringify(data));
});

app.get('/getAnalysisStats', function(req, res) {
    const data = playModel.getAnalysisStats();
    res.send(JSON.stringify(data));
});

app.listen(3001);
