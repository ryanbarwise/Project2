// Function that runs when document is fully load
// route to make a GET request to api usining Axios in order to send data.
document.addEventListener("DOMContentLoaded", function() {
  console.log("Function is loading")
  $.ajax("/api/home/movies", {
    type: "GET"
  }).then(
    function(data){
      console.log(data)
      renderMovies(data)
    }
  )
})

// function render data to server
function renderMovies(data) {
  for (let i = 0; i < 5; i++) {
    // console.log(data[i].Poster);
    const randomNumber = Math.floor(Math.random() * 18);
    // console.log(randomNumber);
    $("#poster" + i).attr("src", data[randomNumber].Poster);
    $("#moviename" + i).text(data[randomNumber].Title);
    $("#actors" + i).text("Actors: " + data[randomNumber].Actors);
    $("#genre" + i).text("Genre: " + data[randomNumber].Genre);
    $("#year" + i).text("Year: " + data[randomNumber].Year);
    $("#description" + i).text(data[randomNumber].Plot);
    $("#link" + i).attr("href", "https://www.imdb.com/title/" + data[randomNumber].imdbID + "/?ref_=nv_sr_srsg_0")
  }
}

// eslint-disable-next-line no-unused-vars
$("#unic").on("click", function(_event) {
  $.ajax({
    url: "https://www.omdbapi.com/?t=romancing+the+stone&y=&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});


