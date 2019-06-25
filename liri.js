require("dotenv").config();
const axios = require('axios');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// 1557ce71 OMDB API KEY

var action = process.argv[2].toLowerCase();
var searchTerm = process.argv.slice(3);

function spotifySearch() {
    console.log("This is the spotify search");
}

function omdbSearch() {
    axios.get("http://www.omdbapi.com/?apikey=1557ce71&t=" + searchTerm)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    console.log("This is the OMDB search");
}

function concertSearch() {
    console.log("This is the concert search");
}

function doWhatItSays() {
    console.log("This is Do what it says");
}

switch(action) {
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        omdbSearch();
        break;
    case "concert-this":
        concertSearch();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        return console.log("Choose a valid action");
}