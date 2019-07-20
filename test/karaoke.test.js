var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/test", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Songs.bulkCreate([
      {
        title: "Sweet Caroline",
        artist: "Neil Diamond",
        year: 1969,
        genre: "Pop",
        album: "Sweet Caroline",
        duet: 0,
        karafunID: 6534,
        spotifyID: "62AuGbAkt8Ox2IrFFb8GKV",
        youtubeURL: "https://www.youtube.com/watch?v=jzXt7YvK9Hw",
        duration: 203573,
        popularity: 77,
        explicit: 0,
        languages: "English",
        lyrics: "Sweet Caroline. BAP BAP BAP"
      },
      {
        title: "Wannabe",
        artist: "Spice Girls",
        year: 1996,
        genre: "Teen pop,Pop",
        album: "Spice",
        duet: 0,
        karafunID: 11342,
        spotifyID: "1Je1IMUlBXcx1Fz0WE7oPT",
        youtubeURL: "https://www.youtube.com/watch?v=fw-QRyQcFH8",
        duration: 173026,
        popularity: 79,
        explicit: 0,
        languages: "English",
        lyrics: "Zig A Zig AH"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/test").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            title: "Sweet Caroline",
            artist: "Neil Diamond",
            year: 1969,
            genre: "Pop",
            album: "Sweet Caroline",
            duet: false,
            karafunID: 6534,
            spotifyID: "62AuGbAkt8Ox2IrFFb8GKV",
            youtubeURL: "https://www.youtube.com/watch?v=jzXt7YvK9Hw",
            duration: "203573",
            popularity: 77,
            explicit: false,
            languages: "English",
            lyrics: "Sweet Caroline. BAP BAP BAP"
          });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({
            title: "Wannabe",
            artist: "Spice Girls",
            year: 1996,
            genre: "Teen pop,Pop",
            album: "Spice",
            duet: false,
            karafunID: 11342,
            spotifyID: "1Je1IMUlBXcx1Fz0WE7oPT",
            youtubeURL: "https://www.youtube.com/watch?v=fw-QRyQcFH8",
            duration: "173026",
            popularity: 79,
            explicit: false,
            languages: "English",
            lyrics: "Zig A Zig AH"
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
