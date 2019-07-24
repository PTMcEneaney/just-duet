var db = require("../models");
var Sequelize = require("sequelize");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {
  // Load index page
  var topFeminine = [
    { full: "Shake It Off – Taylor Swift" },
    { full: "Stronger (What Doesn't Kill You) – Kelly Clarkson" },
    { full: "I Will Survive – Gloria Gaynor" },
    { full: "It’s Raining Men – The Weather Girls" },
    { full: "Single Ladies – Beyoncé" },
    { full: "Like a Virgin – Madonna" },
    { full: "Wrecking Ball – Miley Cyrus" },
    { full: "Emotions – Mariah Carey" },
    { full: "Rehab – Amy Winehouse" },
    { full: "Black Velvet – Alannah Myles" },
    { full: "Son of a Preacher Man – Dusty Springfield" },
    { full: "Damn, I Wish I Was Your Lover – Sophie B. Hawkins" }
  ];
  var topMasculine = [
    { full: "Sweet Caroline – Neil Diamond" },
    { full: "Don’t Stop Believin’ – Journey" },
    { full: "Bohemian Rhapsody – Queen" },
    { full: "Wonderwall – Oasis" },
    { full: "My Way – Frank Sinatra" },
    { full: "I Wanna Be Sedated – the Ramones" },
    { full: "Losing My Religion – R.E.M." },
    { full: "Never Gonna Give You Up – Rick Astley" },
    { full: "867-5309/Jenny – Tommy Tutone" },
    { full: "Mack the Knife – Bobby Darin" },
    { full: "If I Was Your Girlfriend – Prince" },
    { full: "When I Was Your Man – Bruno Mars" }
  ];
  var topEasy = [
    { full: "500 Miles – The Proclaimers" },
    { full: "These Boots Are Made for Walking – Nancy Sinatra" },
    { full: "Crazy – Patsy Cline" },
    { full: "Happy – Pharrell Williams" },
    { full: "Copacabana – Barry Manilow" },
    { full: "That’s the Way (I Like It) – KC and the Sunshine Band" },
    { full: "Celebration – Kool and the Gang" },
    { full: "Funkytown – Lipps, Inc" },
    { full: "Don’t Worry, Be Happy – Bobby McFerrin" },
    { full: "Eye of the Tiger – Survivor" }
  ];
  var topDuet = [
    { full: "The Boy is Mine – Brandy and Monica" },
    { full: "Cruisin’ – Huey Lewis and Gwyneth Paltrow" },
    { full: "Islands in the Stream – Kenny Rogers and Dolly Parton" },
    { full: "Need You Now – Lady Antebellum" },
    { full: "All I Have – Jennifer Lopez and LL Cool J" },
    { full: "Up Where We Belong – Joe Cocker and Jennifer Warnes" },
    { full: "Empire State of Mind – Jay-Z and Alicia Keys" },
    { full: "Ebony and Ivory – Paul McCartney and Stevie Wonder" },
    {
      full: "Dream a Little Dream of Me – Ella Fitzgerald and Louis Armstrong"
    },
    { full: "Hunger Strike – Eddie Vedder and Chris Cornell" }
  ];
  var topGroup = [
    { full: "We Are Family – Sister Sledge" },
    { full: "California Dreamin’ – The Mamas and the Papas" },
    { full: "ABC – Jackson 5" },
    { full: "Wannabe – Spice Girls" },
    { full: "Push It – Salt ‘n Pepa" },
    { full: "No Scrubs – TLC" },
    { full: "Lean On Me – Club Nouveau" },
    { full: "Rapper’s Delight – Sugar Hill Gang" },
    { full: "YMCA – Village People" },
    { full: "Supersonic – JJ Fad" }
  ];
  var topJoke = [
    { full: "Rock Lobster – B-52s" },
    { full: "Just a Friend – Biz Markie" },
    { full: "Tubthumping – Chumbawamba" },
    { full: "MMMBop – Hanson" },
    { full: "Mickey – Toni Basil" },
    { full: "Party All the Time – Eddie Murphy" },
    { full: "The Future’s So Bright, I Gotta Wear Shades – Timbuk 3" },
    { full: "Whip It – Devo" },
    { full: "If You Like Piña Coladas – Jimmy Buffet" },
    { full: "Rico Suave – Gerardo" }
  ];
  var top1990 = [
    { full: "Closing Time – Semisonic" },
    { full: "Time of Your Life – Green Day" },
    { full: "You Oughta Know – Alanis Morissette" },
    { full: "Torn – Natalie Imbruglia" },
    { full: "I’ll Stand By You – The Pretenders" },
    { full: "Genie in a Bottle – Christina Aguilera" },
    { full: "Gettin’ Jiggy Wit’ It – Will Smith" },
    { full: "Who Am I? (What’s My Name) – Snoop Dogg" },
    { full: "Santeria – Sublime" },
    { full: "Don’t Speak – No Doubt" }
  ];
  var top1980 = [
    { full: "Billie Jean – Michael Jackson" },
    { full: "I Want to Know What Love Is – Foreigner" },
    { full: "I Think We’re Alone Now – Tiffany" },
    { full: "Wake Me Up Before You Go Go – Wham!" },
    { full: "Don’t You Want Me – Human League" },
    { full: "Tainted Love – Soft Cell" },
    { full: "I Can’t Wait – Nu Shooz" },
    { full: "All Night Long – Lionel Richie" },
    { full: "Everybody Wants to Rule the World – Tears for Fears" },
    { full: "Rapture – Blondie" }
  ];
  var top1970 = [
    { full: "Dancing Queen – ABBA" },
    { full: "Stayin’ Alive – The Bee Gees" },
    { full: "I’m Every Woman – Chaka Khan" },
    { full: "Do Ya Think I’m Sexy – Rod Stewart" },
    { full: "Play That Funky Music – Wild Cherry" },
    { full: "Brick House – Commodores" },
    { full: "Big Yellow Taxi – Joni Mitchell" },
    { full: "You’re So Vain – Carly Simon" },
    { full: "Let’s Get it On – Marvin Gaye" }
  ];
  var top1960 = [
    { full: "Sweet Caroline - Neil Diamond" },
    { full: "Shout - Otis Day And The Knights/Isley Brothers" },
    { full: "Brown Eyed Girl - Van Morrison" },
    { full: "The Way You Look Tonight - Frank Sinatra" },
    { full: "Twist And Shout - Beatles" },
    { full: "At Last - Etta James" },
    { full: "What A Wonderful World - Louis Armstrong" },
    { full: "My Girl - Temptations" },
    { full: "Can't Help Falling In Love - Elvis Presley" },
    { full: "The Twist - Chubby Checker" }
  ];
  var top1950 = [
    { full: "That's Amore - Dean Martin" },
    { full: "Come Fly With Me - Frank Sinatra" },
    { full: "Jailhouse Rock - Elvis Presley" },
    { full: "I Walk The Line - Johnny Cash" },
    { full: "I've Got You Under My Skin - Frank Sinatra" },
    { full: "In the Mood - Glenn Miller" },
    { full: "All Shook Up - Elvis Presley" },
    { full: "La Bamba - Ritchie Valens" },
    { full: "You Make Me Feel So Young - Frank Sinatra" },
    { full: "Great Balls Of Fire - Jerry Lee Lewis" }
  ];
  var topLove = [
    { full: "Time After Time – Cyndi Lauper" },
    { full: "Wicked Game – Chris Isaak" },
    { full: "Try a Little Tenderness – Otis Redding" },
    { full: "Come to My Window – Melissa Etheridge" },
    { full: "The Sweetest Thing – U2" },
    { full: "I Melt With You – Modern English" },
    { full: "That’s the Way Love Goes – Janet Jackson" },
    { full: "Can’t Help Falling in Love – Elvis Presley" },
    { full: "She Loves You – the Beatles" },
    { full: "Nothing Compares 2 U – Sinead O’Connor" }
  ];
  var topRock = [
    { full: "Pour Some Sugar On Me – Def Leppard" },
    { full: "Creep – Radiohead" },
    { full: "Born in the USA – Bruce Springsteen" },
    { full: "Under the Bridge – Red Hot Chili Peppers" },
    { full: "We’re Not Gonna Take It – Twisted Sister" },
    { full: "Livin’ On a Prayer – Bon Jovi" },
    { full: "Sweet Home Alabama – Lynyrd Skynyrd" },
    { full: "Piece of My Heart – Janis Joplin" },
    { full: "Zombie – The Cranberries" },
    { full: "Enter Sandman – Metallica" }
  ];
  var topPop = [
    { full: "Royals – Lorde" },
    { full: "Baby One More Time – Britney Spears" },
    { full: "Push – Matchbox Twenty" },
    { full: "Treasure – Bruno Mars" },
    { full: "Call Me Maybe – Carly Rae Jepsen" },
    { full: "Hallelujah – Jeff Buckley" },
    { full: "Iris – Goo Goo Dolls" },
    { full: "The Middle – Jimmy Eat World" },
    { full: "Timber – Ke$ha and Pitbull" },
    { full: "All About That Bass – Meghan Trainor" }
  ];
  var topRnB = [
    { full: "This is How We Do It – Montell Jordan" },
    { full: "Let’s Stay Together – Al Green" },
    { full: "Poison – Bel Biv Devoe" },
    { full: "End of the Road – Boyz II Men" },
    { full: "No Diggity – Blackstreet" },
    { full: "Doo Wop (That Thing) – Lauryn Hill" },
    { full: "Un-break My Heart – Toni Braxton" },
    { full: "Not Gon’ Cry – Mary J. Blige" },
    { full: "He’s So Fine – The Chiffons" },
    { full: "Chain of Fools – Aretha Franklin" }
  ];
  var topCountry = [
    { full: "Man! I Feel Like a Woman! – Shania Twain" },
    { full: "Something to Talk About – Bonnie Raitt" },
    { full: "Ring of Fire – Johnny Cash" },
    { full: "Take Me Home, Country Roads – John Denver" },
    { full: "Stand By Your Man – Tammy Wynette" },
    { full: "Friends In Low Places – Garth Brooks" },
    { full: "Your Cheatin’ Heart – Hank Williams" },
    { full: "Before He Cheats – Carrie Underwood" },
    { full: "Celebrity – Brad Paisley" },
    { full: "All My Ex’s Live in Texas – George Strait" }
  ];
  var topBad = [
    { full: "Achy Breaky Heart – Billy Ray Cyrus" },
    { full: "I’ve Got You Babe – Sonny and Cher" },
    { full: "Picture – Sheryl Crow and Kid Rock" },
    { full: "Baby Got Back – Sir Mix-A-Lot" },
    { full: "Ice Ice Baby – Vanilla Ice" },
    { full: "Barbie Girl – Aqua" },
    { full: "My Heart Will Go On – Celine Dion" },
    { full: "Margaritaville – Jimmy Buffet" },
    { full: "Boyfriend – Justin Bieber" },
    { full: "Friday – Rebecca Black" }
  ];

  var topRecs = [
    {
      name: "Female Vocals",
      songs: topFeminine,
      dataTarget: "#collapse1",
      id: "collapse1",
      heading: "heading1"
    },
    {
      name: "Male Vocals",
      songs: topMasculine,
      dataTarget: "#collapse2",
      id: "collapse2"
    },
    {
      name: "Easy / Beginner Songs",
      songs: topEasy,
      dataTarget: "#collapse3",
      id: "collapse3"
    },
    {
      name: "Duets!",
      songs: topDuet,
      dataTarget: "#collapse4",
      id: "collapse4"
    },
    {
      name: "Karaoke Songs for Groups",
      songs: topGroup,
      dataTarget: "#collapse5",
      id: "collapse5"
    },
    {
      name: "Light Hearted Songs",
      songs: topJoke,
      dataTarget: "#collapse6",
      id: "collapse6"
    },
    {
      name: "Top Karaoke Songs from the 90's",
      songs: top1990,
      dataTarget: "#collapse7",
      id: "collapse7"
    },
    {
      name: "Top Karaoke Songs from the 80's",
      songs: top1980,
      dataTarget: "#collapse8",
      id: "collapse8"
    },
    {
      name: "Top Karaoke Songs from the 70's",
      songs: top1970,
      dataTarget: "#collapse9",
      id: "collapse9"
    },
    {
      name: "Top Karaoke Songs from the 60's",
      songs: top1960,
      dataTarget: "#collapse10",
      id: "collapse10"
    },
    {
      name: "Top Karaoke Songs from the 50's",
      songs: top1950,
      dataTarget: "#collapse11",
      id: "collapse11"
    },
    {
      name: "Romantic Songs",
      songs: topLove,
      dataTarget: "#collapse12",
      id: "collapse12"
    },
    {
      name: "Rock Songs",
      songs: topRock,
      dataTarget: "#collapse13",
      id: "collapse13"
    },
    {
      name: "Pop Songs",
      songs: topPop,
      dataTarget: "#collapse14",
      id: "collapse14"
    },
    {
      name: "R&B Songs",
      songs: topRnB,
      dataTarget: "#collapse15",
      id: "collapse15"
    },
    {
      name: "Country Songs",
      songs: topCountry,
      dataTarget: "#collapse16",
      id: "collapse16"
    },
    {
      name: "Worst Karaoke Songs to Sing",
      songs: topBad,
      dataTarget: "#collapse17",
      id: "collapse17"
    }
  ];

  var dbQuery = function (artist, track, cb) {
    db.Songs.findAll({
      where: {
        artist: artist,
        title: track
      }
    }).then(function (data) {
      // console.log(data);
      if (data[0] !== undefined) {
        cb(data[0].dataValues);
      } else {
        console.log("oops, something went wrong!");
      }
    });
  };
  var convertMS = function (milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds
    };
  };

  var profileYes = '<a class="nav-item nav-link" href="/profile">Profile</a>';
  var statusYes = '<a class="btn btn-primary" id="logoutButton" role="button" href="/logout">Log Out</a>';
  var profileNo = '<a class="nav-item nav-link disabled" href="/profile">Profile</a>';
  var statusNo = '<a class="btn btn-primary" id="loginButton" role="button" href="/login">Log In</a>';

  var renderPage = function (req, res, locationYes, locationNo) {
    if (req.user) {
      profileYes = '<a class="nav-item nav-link" href="/profile/' + req.user.id + '">Profile</a>';
      res.render(locationYes, {
        topRecs: topRecs,
        profile: profileYes,
        userStatus: statusYes
      });
    } else {
      res.render(locationNo, {
        topRecs: topRecs,
        profile: profileNo,
        userStatus: statusNo
      });
    };
  }

  app.get("/", function (req, res) {
    renderPage(req, res, "index", "index");
  });

  app.get("/signup", function (req, res) {
    renderPage(req, res, "index", "signup")
  });

  app.get("/login", function (req, res) {
    renderPage(req, res, "index", "login")
  });

  app.get("/creators", function (req, res) {
    renderPage(req, res, "creators", "creators")
  });

  app.get("/profile/:userID", isAuthenticated, function (req, res) {
    var Op = Sequelize.Op;

    var user = req.params.userID;
    db.SwingTable.findAll({
      where: {
        userID: user
      }
    }).then(function (data) {
      var result = [];
      var userSongs = [];
      // var userRatings
      for (var i = 0; i < data.length; i++) {
        result.push(data[i].dataValues);
        userSongs.push(data[i].dataValues.songId)
      }
      // console.log(result);


      var renderProf = function (dbResults) {
        for (var i = 0; i < dbResults.length; i++) {
          //converting star ratings to icons
          if (result[i].rating === 1) {
            dbResults[i].rating = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          } else if (result[i].rating === 2) {
            dbResults[i].rating = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          } else if (result[i].rating === 3) {
            dbResults[i].rating = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          } else if (result[i].rating === 4) {
            dbResults[i].rating = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>'
          } else if (result[i].rating === 5) {
            dbResults[i].rating = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>'
          } else {
            dbResults[i].rating = '<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>'
          }
        }
        res.render("profile", {
          profile: '<a class="nav-item nav-link active" href="/profile">Profile</a>',
          userStatus:  '<a class="btn btn-primary" id="logoutButton" role="button" href="/logout">Log Out</a>',
          ratings: result,
          dbResults: dbResults,
        });
      }

      db.Songs.findAll({
        where: {
          id: {
            [Op.in]: userSongs
          }
        }
      }).then(function (data) {
        var dbResults = [];
        for (var i = 0; i < data.length; i++) {
          dbResults.push(data[i].dataValues);
        }
        // console.log("data returned: ", results)
        if (dbResults.length >= data.length) {
          renderProf(dbResults);
        }
      });

    });
  });


  app.get("/results/:songArtist", function (req, res) {
    console.log("HTML ROUTE " + req.params.songArtist);
    var text = req.params.songArtist.split("-");
    var song = text[0]
      .trim()
      .split("+")
      .join(" ");

    var youtube =
      "https://www.youtube.com/results?search_query=" +
      text[0] +
      "+" +
      text[1] +
      "+lyrics";

    var artist = text[1]
      .trim()
      .split("+")
      .join(" "); 

    var render = function (data) {
      var duration = convertMS(data.duration);
      duration = duration.minute + " min " + duration.seconds + " seconds";
      
      // console.log(song, youtube, artist, data.year, data.genre, data.album, data.duet, duration, data.popularity, data.explicit, data.languages, data.youtubeURL);
      if (req.user) {
      res.render("songResult", {
        profile: profileYes,
        userStatus: statusYes,
        song: song,
        youtube: youtube,
        artist: artist,
        year: data.year,
        genre: data.genre,
        album: data.album,
        duet: data.duet,
        duration: duration,
        popularity: data.popularity,
        explicit: data.explicit,
        languages: data.languages,
        youtubeURL: data.youtubeURL,
        query: youtube

      });
    };
    res.render("songResult", {
      profile: profileNo,
      userStatus: statusNo,
      song: song,
      youtube: youtube,
      artist: artist,
      year: data.year,
      genre: data.genre,
      album: data.album,
      duet: data.duet,
      duration: duration,
      popularity: data.popularity,
      explicit: data.explicit,
      languages: data.languages,
      youtubeURL: data.youtubeURL,
      query: youtube
    });
    };

    dbQuery(artist, song, render);
  });

  app.get("/maps", function (req, res) {
    renderPage(req, res, "maps", "maps");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    renderPage(req, res, "404", "404");
  });
  

};