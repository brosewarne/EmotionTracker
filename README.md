# Marvel Character Browser

This project is a simple example of using the Marvel Developer API along with React to create a simple Marvel Character Browser.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation and running
* Checkout the repository
* Change into the checked out project
* Run `npm install` - or `yarn install` if yarn is available 
* Run `npm start` - this will start the project on port 3000 

## Development Approach

I implemented a basic version of this project about 6 months ago, the approach I followed then was:

> I started by playing around with the Marvel API Swagger and seeing what was available. In order to meet the requirements, I thought of showing a browser with a grid of character names and images that could be browsed by the starting letter of the character's name and providing a way to navigate through all characters whose name start with the selected letter. I also wanted to add a way to click on a character to view a simple profile.
  
>  I then went through the following steps to get the app up and running:
>  * I used create-react-app to avoid spending time setting up the project, build system and dev environment
>  * Set up a function using fetch() to get a simple list of characters
>  * Started work on the character menu (the main character grid), gradually breaking things down to smaller components until I had a basic Flexbox based grid of character names and image placeholders
>  * Added functionality for showing images in the grid
>  * Added react-router v4 and set up routes for the main grid and the character page
>  * Setup a simple character page showing the characters name, image and a simple profile
>  * Added the alphabet menu and functionality for getting a different range of characters
>  * Added the pagination menu and functionality for showing the different pages
>  * Code cleanup, added ESDoc blocks and cleaned up the styling

When I picked the project up again, with the new requirements, I had to make things bit more generic and build in more of the quality that was missing the first time around while I was rushing:
> * Added better linting and testing support by customizing the eslint config and adding Enzyme
> * Sorted out the dependencies and made sure everything was up to date
> * Fixed all linting errors and added tests for existing functionality
> * Cleaned up the design and made components more generic so I could use the same components (mostly) for characters, comics and series
> * Worked on the visual design, adding material-ui to the project and converting as much as possible to material-ui components
> * Added more routes and components for comics and series
> * Added a more generic home page to display a random character, comic or series on page load
> * Added the series and comic browsers and associated profile pages
> * Used redux to get the payloads from the store instead of passing around router props
> * Final round of testing and reviewing

Thing's I'd like to do better:
> * Make the character, comic and series pages more generic
> * Cleanup the functions used to make the API calls
> * Improve the pagination component, it doesn't scale very well in it's current basic form
> * I had plans for searching and filtering and showing related comics and characters, but ran out of time
> * Better visual design - this was my first time in a long time using material-ui, I didn;t have time to customise some of the styles or try out more components
> * 90-100% test coverage - about 65% at the moment
> * I'm sure there's still some code cleanup left to do, plus some better, more informative docstrings


## Screenshots

### Character Browser
![CharacterBrowser](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/character_browser.png)

### Comic Browser
![ComicBrowser](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/comic_browser.png)

### Series Browser
![SeriesBrowser](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/series_browser.png)

### Character Page
![CharacterPage](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/character_page.png)

### Character Browser Before Refactor
![CharacterBrowserBefore](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/character_browser_old.png)

### Character Page Before Refactor
![CharacterPageBefore](https://raw.githubusercontent.com/brosewarne/marvel-browser/master/screenshots/character_page_old.png)
