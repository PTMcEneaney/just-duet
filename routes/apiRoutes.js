/* eslint-disable no-alert */
var db = require("../models");
var Spotify = require("node-spotify-api");
var keys = require("./../keys.js");
var Sequelize = require("sequelize");
var spotify = new Spotify(keys.spotify);
var passport = require("../config/passport");

var trackObject = [];
var spotifyIDs = [];

var parseTracks = function(type, query, data) {
  trackObject = [];
  for (var i = 0; i < data.tracks.items.length; i++) {
    //parsing the date string to return the year only
    var date = data.tracks.items[i].album.release_date.split("-");
    var year = date[0];

    //create array of objects w/spotify data
    trackObject.push({
      type: type,
      query: query,
      track: data.tracks.items[i].name,
      artist: data.tracks.items[i].artists[0].name,
      year: year,
      album: data.tracks.items[i].album.name,
      spotifyID: data.tracks.items[i].id,
      popularity: data.tracks.items[i].popularity,
      duration: data.tracks.items[i].duration_ms
    });
  }

  //for loop to update database with new spotify data
  for (var j = 0; j < trackObject.length; j++) {
    matchTracks(trackObject[j]);
  }

  // var users = [["test@test.com", "test123"], ["test2@test.com", "test222"]];
  // for (var j = 0; j < userData.length; j++) {
  //   db.Users.create({
  //     email: users[j][0],
  //     password: users[j][1]
  //   }).then(function(data) {
  //     console.log(data);
  //   });
  // };
  // var userData = [[1, 76, 2], [1, 94, 4], [1, 27, 3], [1, 5, 5], [2, 30, 3], [2, 45, 5], [1, 200, 1]];
  // for (var j = 0; j < userData.length; j++) {
  //   db.SwingTable.create({
  //     userID: userData[j][0],
  //     songID: userData[j][1],
  //     rating: userData[j][2]
  //   }).then(function(data) {
  //     console.log(data);
  //   });
  // };
};

var matchTracks = function(tracks) {
  var artist = tracks.artist;
  var title = tracks.track;
  var album = tracks.album;
  var spotifyID = tracks.spotifyID;
  var duration = tracks.duration;
  var popularity = tracks.popularity;
  var year = tracks.year;

  //query db to find matching records
  db.Songs.findAll({
    where: {
      artist: artist,
      title: title
    }
  }).then(function(data) {
    //if there is a matching record, update db with spotify info
    if (data[0] !== undefined) {
      // console.log("Record #" + j + " found: " + artist + title + " updated");
      updateTracks(artist, title, album, spotifyID, duration, popularity);
    } else {
      //if there is no match, create a new record and populate with spotify info
      // console.log("Record #" + j + " not found: " + artist + title + " created");
      createTracks(artist, title, album, spotifyID, duration, year, popularity);
    }
  });
};

var updateTracks = function(
  artist,
  title,
  album,
  spotifyID,
  duration,
  popularity
){
  //if there is a matching record, update db with spotify info
  db.Songs.update(
    {
      album: album,
      spotifyID: spotifyID,
      duration: duration,
      popularity: popularity
    },
    {
      where: {
        artist: artist,
        title: title
      }
    }
  ).then(function(data) {
    console.log("updated" + data + "record for: " + artist + " - " + title);
  });
};

var createTracks = function(
  artist,
  title,
  album,
  spotifyID,
  duration,
  year,
  popularity
) {
  //if there is no match, create a new record and populate with spotify info
  db.Songs.create({
    title: title,
    artist: artist,
    album: album,
    spotifyID: spotifyID,
    duration: duration,
    year: year,
    popularity: popularity
  }).then(function(data) {
    // console.log("created record for: " + artist + " - " + title);
    var data = data;
  });
};

var getSongData = function(data, cb) {
  var Op = Sequelize.Op;
  spotifyIDs = [];
  for (var i = 0; i < data.tracks.items.length; i++) {
    spotifyIDs.push(data.tracks.items[i].id);
  }
  db.Songs.findAll({
    where: {
      spotifyID: {
        /* eslint-disable no-alert */
        [Op.in]: spotifyIDs
      }
    }
  }).then(function(data) {
    var results = [];
    for (var i = 0; i < data.length; i++) {
      results.push(data[i].dataValues);
    }
    // console.log("data returned: ", results)
    if (results.length >= data.length) {
      cb(results);
    }
  });
};

module.exports = function(app) {
  // Get all songs in the db
  app.get("/api/songs", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/test", function(req, res) {
    db.Songs.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Get specific results based on artist/track/etc and the query
  app.get("/spotify/:type/:query", function(req, res) {
    var type = req.params.type.toLowerCase();
    var query = req.params.query
      .split("+")
      .join(" ")
      .toLowerCase();
    var limit = 5;

    console.log("Search: " + type + " - " + query);
    // Do Spotify lookup
    if (type !== "track" && type !== "search type") {
      query = type + ":" + query;
    }
    spotify.search({ type: "track", query: query, limit: limit }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      // Create / update database if necessary
      parseTracks(type, query, data);
      // Return query from our database
      var returnSong = function(data) {
        res.json(data);
      };

      getSongData(data, returnSong); // query where spotifyId in(<list of ids>)
    });
  });

  /**************USER AND PASSPORT STUFF********************** */
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
    // console.log("user", req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.Users.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

   // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("logout clicked");
    req.logout();
    res.redirect("/");
    // res.render("index", {
    //     topRecs: topRecs,
    //     profile: profileNo,
    //     userStatus: statusNo
      // });
  });
};
