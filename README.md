# Star Wars wiki

Simple application for consuming the https://swapi.dev API.

The wiki page consists of 3 pages.

## Home page

The home page contains a list of species from the swapi.
By selecting a species the Characters page loads.

## Characters page

The characters page lists all the characters that belongs to the a selected species.
You can select a character from this list to learn more about them.

## Profile page

The profile page shows detailed information about a previously selected character.

## Search functionality

On each page, at the navigation bar, you can use the search input to search for characters. By clicking on a search result, the character's profile page is loaded.
## How to run locally

1. Open a terminal and go to the project's root folder.
2. Run `yarn start` or `npm start`
3. Open a browser on http://localhost:3000
4. Profit

## Build production version for deployment

1. Open a terminal and go to the project's root folder.
2. Run `yarn build` or `npm build`
3. Check out the `build` folder, it contains the production version which needs to be served from a web server.
4. Profit

