/* eslint-disable quotes */
/* eslint-disable camelcase */
var song = $("#resultSong").text();
var artist = $("#resultArtist").text();
getLyrics(song, artist);

function getLyrics(song, artist) {
  $.ajax({
    type: "GET",
    data: {
      apikey: "f2f5c2c5d02b5bca83ad9ae6342e9ce6",
      q_track: song,
      q_artist: artist,
      format: "jsonp",
      callback: "jsonp_callback"
    },
    url: "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
    success: function(data) {
      //console.log(data);
      var lyrics = data.message.body.lyrics.lyrics_body;
      var fixedLyrics = lyrics.split("\n");
      //console.log(fixedLyrics);
      for (var i = 0; i < fixedLyrics.length; i++) {
        $("#lyrics").append("<p>" + fixedLyrics[i] + "</p>");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });
}

$("body").on("click", ".heartBtn", function() {
  if ($(this).html() === '<i class="fas fa-heart"></i>') {
    $(this).html('<i class="far fa-heart"></i>');
  } else {
    $(this).html('<i class="fas fa-heart"></i>');
  }
  console.log($(this).attr("value"));
});

$(".youtubeLink").on("click",function(){
  window.open("https://www.youtube.com/results?search_query=" + $("#resultSong").text() + $("#resultArtist").text() + " lyrics", "_blank");
});
