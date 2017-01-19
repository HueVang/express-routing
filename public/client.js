$(function() {
  console.log('document loaded');

  getSongs();

  $('#addSong').on('submit', addSong);

});

function getSongs() {
  $.ajax({
    url: '/songs',
    type: 'GET',
    success: displaySongs
  });
}

function addSong(event) {
  //stop the browswer from trying to navigate away from our page
  event.preventDefault();

  // get the information out of the form
  var songData = $(this).serialize();

  console.log(songData);

  $.ajax({
    url: '/songs',
    type: 'POST',
    data: songData,
    success: getSongs,
    error: errorMessage
  });
}

function displaySongs(songs) {
  console.log(songs);

  $('#songs').empty();

  songs.forEach(function(song) {
    $('#songs').append('<li>' + song.title + ' by ' + song.artist + ' from album ' + song.album + ' date added '  + song.dateAdded +'</li>');
  });
}

function errorMessage() {
  alert('Error, not a valid input.');
}
