
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const henry4 = require('../data/henry_iv.json');
const cachedResults = require('../data/cached_results_henry_iv.json');

// @todo: move username and password somewhere more secure
const nluInterface = new NaturalLanguageUnderstandingV1({
    username: '8b947277-c143-4445-bd85-5444348c8ae8',
    password: 'EbANWVcnQh1o',
    version: '2018-03-16'
});

function precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

class PlayModel {
    constructor() {
        this.playText = henry4;
        this.allResults = cachedResults;

        this.emotionNames = ['joy', 'anger', 'sadness', 'disgust', 'fear'];
        console.log(this.getAnalysisStats());
    }

    /**
     * Write the current state of this.allResults to src/data/cached_results_henry_iv.json
     */
    cacheResults () {
        fs.writeFile("src/data/cached_results_henry_iv.json", JSON.stringify(this.allResults), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("File cache updated");
        })
    };

    // getLinesByIndex(startIndex, stopIndex) {
    //     return this.playText.slice(startIndex, stopIndex);
    // };

    /**
     * Get the playData and result from NLU for the lines between startIndex and stopIndec
     * @param {Number} startIndex - The startIndex for the retrieved data
     * @param {Number} stopIndex - The stopIndex for the retrieved data
     * @returns {Promise} - A promise that will be resolved when all data has been retrieved
     */
    getEmotionForLines(startIndex, stopIndex) {
        const resolvePromise = (resolve, allResults) => {
            if (Object.keys(allResults).length === stopIndex - startIndex) {
                this.cacheResults();
                resolve(allResults)
            }
        };

        return new Promise((resolve, reject) => {
            const allResults = {};
            for (let i = startIndex; i < stopIndex; i++) {
                const lineObj = henry4[i];
                if (Object.keys(this.allResults).includes(lineObj.line_id.toString())) {
                    allResults[lineObj.line_id] = this.allResults[lineObj.line_id.toString()];
                    resolvePromise(resolve, allResults);
                } else {
                    const nluPromise = this.getEmotionResultsForLine(lineObj);
                    nluPromise.then((result) => {
                        allResults[lineObj.line_id] = {playData: lineObj, nluResult: result};
                        this.allResults[lineObj.line_id] = {playData: lineObj, nluResult: result};
                        resolvePromise(resolve, allResults);
                    }).catch((err) => {
                        console.log(err);
                        allResults[lineObj.line_id] ={playData: lineObj, nluResult: null};
                        resolvePromise(resolve, allResults);
                    })
                }
            }
        });
    }

    /**
     * Returns a single nluResult for the specified line object
     * @param {Object} lineObj - The object representing a play line
     * @returns {Promise} - A Promise that will be resolved when the nluResult is available
     */
    getEmotionResultsForLine(lineObj) {
        const text = lineObj.text_entry;
        const parameters = {
            text: text.toString(),
            features: {
                emotion: {}
            }
        };
        return new Promise((resolve, reject) => {
            nluInterface.analyze(parameters, (err, response) => {
                if (err) {
                    console.log('error:', err);
                    reject(err);
                } else {
                    resolve(response);
                }
            })
        });
    }

    /**
     * Returns a set of data for the lineChart chart
     * @returns {Array} - The lineChart chart data
     */
    getLineChartData() {
        const colours = [
            'hsl(119, 70%, 50%)', 
            'hsl(287, 70%, 50%)', 
            'hsl(237, 70%, 50%)', 
            'hsl(358, 70%, 50%)', 
            'hsl(8, 70%, 50%)'
        ];
        const series = this.emotionNames.reduce((allSeries, emotionName, index) => {
            allSeries[emotionName] = { id: emotionName, data: [], color: colours[index] };
            return allSeries;
        }, {});

        for (const lineNumber of Object.keys(this.allResults)) {
            const emotions = this.allResults[lineNumber].nluResult.emotion.document.emotion;
            for (let i = 0; i<this.emotionNames.length; i++) {
                const emotionName = this.emotionNames[i];
                const color = colours[i];
                const dataPoint = { x: parseInt(lineNumber), y: emotions[emotionName], color };
                series[emotionName].data.push(dataPoint);
            }
        }
        return Object.values(series)
    };

    /**
     * Returns a set of data for the heatMap chart
     * @returns {Array} - The heatmap chart data
     */
    getCharacterHeatMapData() {
        const meanEmotions = this.getCharacterMeanEmotions();
        const heatMapData = [];
        for (const character of Object.keys(meanEmotions)) {
            const series = Object.assign({ character }, meanEmotions[character]);
            heatMapData.push(series);
        }
        return heatMapData;
    }

    /**
     * Returns an object mapping each character to their mean value for each emotion
     * @returns {Object} - The mapping of each character to their mean emotional value
     */
    getCharacterMeanEmotions() {
        const meanEmotions = {};
        const emotionsPerCharacter = {};
        for (const lineNumber of Object.keys(this.allResults)) {
            const { playData, nluResult } = this.allResults[lineNumber];
            const emotions = nluResult.emotion.document.emotion;
            const character = playData.speaker;
            if (!emotionsPerCharacter[character]) {
                emotionsPerCharacter[character] = this.emotionNames.reduce((allEmotions, emotionName) => {
                    allEmotions[emotionName] = [];
                    return allEmotions;
                }, {})
            }
            for (const emotionName of this.emotionNames) {
                emotionsPerCharacter[character][emotionName].push(emotions[emotionName])
            }
        }

        for (const character of Object.keys(emotionsPerCharacter)) {
            meanEmotions[character] = {};
            for (const emotionName of this.emotionNames) {
                const sum = emotionsPerCharacter[character][emotionName].reduce(function(acc, val) { return acc + val; }, 0);
                const len = emotionsPerCharacter[character][emotionName].length;
                meanEmotions[character][emotionName] = precisionRound(sum, 2); // precisionRound(sum / len, 4);
            }
        }
        return meanEmotions;
    };

    /**
     * Return a list of all character names in the play - currently unused, functionality not implemented
     * @returns {Array} - The array of character names
     */
    getAllCharacterNames() {
        const characters = [];
        for (const lineObj of this.playText) {
            if (lineObj.speaker && !characters.includes(lineObj.speaker)) {
                characters.push(lineObj.speaker);
            }
        }
        return characters.sort();
    }

    /**
     * Return the current analysis stats - totalLines, linesAnalyses, lastLineSeen
     * @returns {Object} - The current analysis stats
     */
    getAnalysisStats() {
        return {
            totalLines: this.playText.length,
            linesAnalysed: Object.keys(this.allResults).length,
            lastLineSeen: parseInt(Object.keys(this.allResults).sort((a, b) => { return parseInt(b) - parseInt(a)})[0])
        }
    }
}

module.exports = {
    playModel: new PlayModel(),
};
