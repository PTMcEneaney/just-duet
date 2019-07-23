/* eslint-disable quotes */

// Get references to page elements
var $exampleText = $("#example-text");
// eslint-disable-next-line no-unused-vars
var $exampleDescription = $("#example-description");
var $dropdownSearch = $(".dropdown-item");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $creatorBtn = $("#creatorsBtn");

// The API object contains methods for each kind of request we'll make
var API = {
  getSpotify: function(data) {
    var type = data.type;
    var query = data.query;
    return $.ajax({
      url: "spotify/" + type + "/" + query,
      type: "GET"
    });
  },
  results: function(songArtist) {
    return $.get({
      url: "/results/" + songArtist,
      type: "GET",
      data: songArtist
    });
  },
  creators: function() {
    return $.ajax({
      url: "/creators",
      type: "GET"
    });
  }
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var search = {
    query: $exampleText.val().trim(),
    type: $(".dropdown-toggle")
      .text()
      .trim()
  };
  console.log(search.query, search.type);

  if (search.query) {
  API.getSpotify(search).then(function(req, res) {
    console.log("index.js response: ", req, res);

    queryReturn(req);
  });

    $exampleText.val("");
    $dropdownSearch.val("");
  } else {
    alert("Please type something in the search field");
  };
};

var queryReturn = function(data) {
  $(".results").html("");

  // console.log ("query return response: ", data)
  for (var i = 0; i < data.length; i++) {
    var songArtist = data[i].title + " – " + data[i].artist;
    var html =
      '<div class="card-body"><div class="row"><div class="col-9"><p class="song" value="' +
      songArtist +
      '">' +
      songArtist +
      '</p></div><div class="col-3 heart"><p class="heartBtn" id="' +
      data[i].id +
      '" value="' +
      songArtist +
      '"><i class="far fa-heart"></i></p></div></div>';
    $(".results").prepend(html);
  }
};

var dropdownUpdate = function() {
  // eslint-disable-next-line prettier/prettier
  var type = $(this).text().trim();
  $(".dropdown-toggle").text(type);
  $("#submit").removeAttr("disabled");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

$("body").on("click", ".heartBtn", function() {
  if ($(this).html() === '<i class="fas fa-heart"></i>') {
    $(this).html('<i class="far fa-heart"></i>');
  } else {
    $(this).html('<i class="fas fa-heart"></i>');
  }
  console.log($(this).attr("value"));
});

$("body").on("click", ".song", function() {
  console.log($(this).attr("value"));
  console.log("\n\n\n\nTEST");
  var value = $(this).attr("value");

  var songArtist = value.split("–");
  var song = songArtist[0]
    .trim()
    .split(" ")
    .join("+");
  var artist = songArtist[1]
    .trim()
    .split(" ")
    .join("+");

  songArtist = song + "-" + artist;
  console.log(songArtist);

  //window.location.href = "https://rocky-reef-42287.herokuapp.com/results/" + songArtist;
  window.location.href = "https://damp-reaches-93608.herokuapp.com/results/" + songArtist;
  //API.results(songArtist);
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $submitBtn.on("click", $("#submit").attr("disabled"));

$dropdownSearch.on("click", dropdownUpdate);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$creatorBtn.on("click", API.creators());



