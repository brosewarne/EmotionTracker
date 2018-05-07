# Emotion Tracker - Henry IV

This project is a simple example of using the IBM Watson Natural Language Understanding API along with React to create a simple Emotional Results tracker for the Shakespeare play - Henry IV.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation and running
* Checkout the repository
* Change into the checked out project
* Run `npm install` - or `yarn install` if yarn is available 
* Run `npm startAll` - this will start the front end on port 3000 and the backend on port 3001
* I've tested with yarn and not NPM - might e best to use yarn for now...

## Screenshots

### Main Page
![EmotionTracker](https://raw.githubusercontent.com/brosewarne/EmotionTracker/master/screenshots/main_page.png)

### Development Approach
* I started by adapting an old project for the EmotionTracker, removing old code and updating packages etc
* Next was the API, so I started by playing around with the IBM Watson NLU API and seeing whether it could be called form the browser or if I'd have to add a server
* The NPM package for NLU couldn't be called from the browser, so I had to add an express server to the project
* I had contemplated using Python, but due to time constraints, I stuck with nodejs + express
* I wrote some low level stuff to call the api and started working on a visual design once I saw what I could do with the API
* I added a simple component for showing the play data and started working on getting the emotional analysis results
* I wanted to show a table of 5-10 play lines including the strongest emotion and an emoji
* Expanded the server capabilities for retrieving and caching emotion results so I could build up decent sized data set for testing
* Added heatMap and lineChart components based on Nivo components
* Added extra data methods to the server for calculating and sending heatMpa and lineChart data
* Fixed up the state management by adding redux and reducers
* Cleaned up the API calls using redux-saga
* Final test, documentation and cleanup

### Things I ran out of time for
* Unit tests - usually I spend the time for these, but I wanted tpo get something turned in asap
* Make it more scalable - All data is retrieved for the charts on each update, line chart navigation etc
* More functionality for viewing the results for each line 
* Better styling / playing around with props for the Nivo charts