const searchResult = $("#search-result");
const yw = $("#yw");
const nw = $("#nw");

searchResult.hide();
yw.hide();
nw.hide();

$.get("/api/user_data").then(data => {
  $(".member-name").text(data.email);
  console.log(data)
});

$("#search-form").on("click", function (event) {
  event.preventDefault();
  console.log("function works");
  let userSearch = $("#user-input").val().trim();
  $("#search-new").empty();

  console.log(userSearch);

  $.ajax({
    url: "https://www.omdbapi.com/?t=" + userSearch + "&plot=short&apikey=trilogy",
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // Get a reference to the tableList element and populate it with tables
    const tableList = $("#search-new");
    const movieNameEl = $("#movie-name");

    // Then display the fields in the HTML (Section Name, Date, URL)
    const listItem = $("<li class='list-group-item mt-4'>");
    const { Poster, Title, Actors, Genre, Year, Plot } = response;

    listItem.append(
      $("<img>").attr("src", Poster),
      $("<hr>"),
      $("<h3>").text("Actors: " + Actors),
      $("<br>"),
      $("<h3>").text("Genre: " + Genre),
      $("<br>"),
      $("<h3>").text("Year released: " + Year),
      $("<br>"),
      $("<h3>").text(Plot),
      $("<br>"),
      $(`<input type="checkbox" class="form-check-input">`),
      $("<br>"),
      $("<h4>").text("Have you watched " + Title + " before?"),
      $("<br>"),
      $(`<input type="checkbox" class="form-recomend-input">`),//
      $("<br>"),
      $("<h4>").text("Do you recomend " + Title + " to a friend?"),
      $("<br>"),
      $(`<input class="user-rating" placeholder="Enter your rating: 0 - 10">`),
      $(`<textarea class="user-notes" rows="5" placeholder="Give your toughts">`),
      $(`<button class="btn btn-primary btn-sm header-buttons" id="save-btn">`).text("Save")
    );

    tableList.append(listItem);
    $("#movie-name").text(Title),
    searchResult.show();

    $("#save-btn").on("click", () => {
      console.log("works")
      const movie = {
        title: response.Title,
        year: response.Year,
        genre: response.Genre,
        userRating: $(".user-rating").val().trim(),
        watched: $('input[class="form-check-input"]').is(':checked'),
        notes: $(".user-notes").val().trim(),
        recommend: $('input[class="form-recomend-input"]').is(':checked')
      }
      post(movie);
    })
  })
})

const post = (movie) => {
  $.ajax("/api/new", {
    type: "POST",
    data: movie
  }).then(
    function () {
      console.log(`post request has been sent`);
      location.reload();
    });
}

function runTableQuery() {
  // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
  $.ajax({ url: "/api/user_data", method: "GET" })
    .then(function (tableData) {

      // Here we then log the tableData to console, where it will show up as an object.
      console.log(tableData.movies);
      console.log("------------------------------------");

      const { movies } = tableData;

      // Loop through and display each of the customers
      for (let i = 0; i < movies.length; i++) {

        // Get a reference to the watched element and populate it with tables
        const watchedMoviesLi = $("#watched-movies");
        const wantToWatchLi = $("#want-to-watch");

        // Then display the fields in the HTML (Section Title, Genre, recommendation)
        const listItem = $("<div class='list-group-item mt-4'>");
        const listItem1 = $("<div class='list-group-item mt-4'>");

        // destructuring tableData object
        const { title, genre, recommend, watched } = tableData.movies[i];

        console.log(title, genre, recommend, watched);

        if (movies[i].watched) {
          console.log("true line 113")
          yw.show();

          listItem.append(
            $("<h2>").text(movies[i].title),
            $("<hr>"),
            $("<h5>").text("Genre: " + movies[i].genre),
            $("<h5>").text("My rating: " + movies[i].userRating),
            $("<h5>").text("Notes: " + movies[i].notes),
            $(`<button class="delete-btn" data-id="${movies[i].id}">`).text("Delete")
          );

          watchedMoviesLi.append(listItem);

        } else {
          console.log("false - line 128")
          nw.show();

          listItem1.append(
            $("<h2>").text(tableData.movies[i].title),
            $("<hr>"),
            $("<h5>").text("Genre: " + tableData.movies[i].genre),
            $(`<button class="delete-btn" data-id="${tableData.movies[i].id}">`).text("Delete")
          );

          wantToWatchLi.append(listItem1);

        }
      }
    });
}

runTableQuery();


$("#user").on("click", ".delete-btn", function (event) {
  let movieId = $(this).data("id");
  console.log(movieId);
  console.log("delete works");

  $.ajax("/api/movie/" + movieId, {
    method: "DELETE"
  }).then(function () {
    console.log("movie has been deleted");
    location.reload();
  })
});

$("#user1").on("click", ".delete-btn", function (event) {
  let movieId = $(this).data("id");
  console.log(movieId);
  console.log("delete works");

  $.ajax("/api/movie/" + movieId, {
    method: "DELETE"
  }).then(function () {
    console.log("movie has been deleted");
    location.reload();
  })
});