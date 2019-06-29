require("dotenv").config();
const axios = require('axios');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// 1557ce71 OMDB API KEY

var action = process.argv[2].toLowerCase();
var searchTerm = process.argv.slice(3);
var display = process.argv.slice(3).join(" ");
// var searchSong = process.argv.slice(3).join("");

function spotifySearch() {
    // console.log("This is the spotify search");
    if(process.argv.length === 3){
        searchTerm = "The Sign";
    }
    spotify.search({
        type: "track",
        query: searchTerm,
        limit: 10,
    }, function(err,data) {
        if(err) {
            return console.log("Error occurred: " + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
 
        console.log(`Artist: ${data.tracks.items[i].artists[0].name}\nSong Name: ${data.tracks.items[i].name}\nSpotify Preview Link: ${data.tracks.items[i].preview_url}\nAlbum: ${data.tracks.items[i].album.name}\n\n`);
    }
    })
    trackInfo(action, searchTerm);
 }
 
 function omdbSearch() {
    if(process.argv.length === 3){
        searchTerm = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?apikey=1557ce71&t=" + searchTerm)
        .then(function (response) {
            console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n----------\n`);
        })
        .catch(function (error) {
            console.log(error);
        })
    console.log(`\n\n----------OMBD RESULTS FOR: ${display}----------\n`);
    trackInfo(action, searchTerm);
}

function concertSearch() {
    searchTerm = process.argv.slice(3).join("%20");
    console.log(`\n\n----------Upcoming concerts for ${display}----------\n`);
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("axios function is running");
            for (var i = 0; i < response.data.length; i++) {
                console.log(`----------\nVenue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${response.data[i].datetime}\n----------\n\n`);
            }

        });
        trackInfo(action, searchTerm);
};


function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } var dataArray = data.split(", ");
         var command = dataArray[0];
            searchTerm = dataArray[1];
            work(command);
        })
        trackInfo(action, searchTerm);
    }

function work(term) {
switch (term) {
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
}}
work(action);

function trackInfo(termOne, termTwo) {
    termTwo = JSON.stringify(termTwo);
    termTwo = termTwo.split("\",\"").join(" ");
    var text = `\n${termOne} ${termTwo}`;
    fs.appendFile("./log.txt", text, function(error) {
        if (error) {
            console.log(error);
        } else {
        
        }
    })
}