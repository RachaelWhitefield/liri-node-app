require("dotenv").config();
const axios = require('axios');
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// 1557ce71 OMDB API KEY

var action = process.argv[2].toLowerCase();
var searchMovie = process.argv.slice(3).join("+");
var searchConcert = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");
var searchSong = process.argv.slice(3).join("");

function spotifySearch() {
    console.log("This is the spotify search");
    if(process.argv.length === 3){
        searchTerm = "Hotel California";
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
 }
 
 var searchTerm = process.argv.slice(3);
// function spotifySearch() {
//     spotify.search({
//         type: "track",
//         query: searchSong,
//     }, function(err, data) {
//         if(err) {
//             return console.log("Error occured: " + err);
//         }
//         console.log(data);
//     })
// }

function omdbSearch() {
    axios.get("http://www.omdbapi.com/?apikey=1557ce71&t=" + searchMovie)
        .then(function (response) {
            console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n----------\n`);
        })
        .catch(function (error) {
            console.log(error);
        })
    console.log(`\n\n----------OMBD RESULTS FOR: ${display}----------\n`);
}
var searchMovie = process.argv.slice(3).join("+");

function concertSearch() {
    console.log(`\n\n----------Upcoming concerts for ${display}----------\n`);
    axios.get("https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(`----------\nVenue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${response.data[i].datetime}\n----------\n\n`);
            }
        });
};


function doWhatItSays() {
    fs.appendFile("random.txt", "spotify-this-song", function(error, data) {
        if (error) {
            return console.log(error);
        } else
            console.log("Backstreet Boys for LIFE");
    })
    console.log("This is Do what it says");
}

switch (action) {
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