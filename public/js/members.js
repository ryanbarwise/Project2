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

    // Then display the fields in the HTML (Section Name, Date, URL)
    const listItem = $("<li class='list-group-item mt-4'>");
    const { Poster, Title, Actors, Genre, Year, Plot} = response;

    listItem.append(
      $("<img>").attr("src", Poster),
      $("<hr>"),
      $("<h1>").text(Title),
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
      $(`<textarea class="user-rating" rows="3" placeholder="Enter your rating: 0 - 10">`),
      $(`<textarea class="user-coments" rows="3" placeholder="Give your toughts">`),
      $(`<textarea class="user-reco" placeholder="Enter your recomendation: 0 - 10">`),
      $(`<button id="save-btn">`).text("Save")
    );

    tableList.append(listItem);

    $("#save-btn").on("click", () => {
      console.log("works")
      const movie = {
        title: response.Title,
        year: response.Year,
        genre: response.Genre,
        userRating: $(".user-rating").val().trim(),
        watched: $('input[class="form-check-input"]').is(':checked'),
        notes: $(".user-coments").val().trim(),
        recommend: $(".user-reco").val().trim()
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
      console.log(tableData.movies[0]);
      console.log("------------------------------------");

      // Loop through and display each of the customers
      for (var i = 0; i < tableData.movies.length; i++) {

        // Get a reference to the tableList element and populate it with tables
        var tableList = $("#tableList");

        // Then display the fields in the HTML (Section Name, Date, URL)
        var listItem = $("<div class='list-group-item mt-4'>");

        listItem.append(
          $("<h2>").text("Title: " + tableData.movies[i].title),
          $("<hr>"),
          $("<h5>").text("Genre: " + tableData.movies[i].genre),
          $("<h5>").text("Rating: " + tableData.movies[i].recommend),
          $("<h5>").text("Watched: " + tableData.movies[i].watched),
          $(`<button class="delete-btn" data-id="${tableData.movies[i].id}">`).text("Delete")
        );

        tableList.append(listItem);
      }
    });
}

runTableQuery();


$("#user").on("click", ".delete-btn", function (event) {
  let movieId = $(this).data("id");
  console.log(movieId);
  console.log("delete work");

  $.ajax("/api/movie/" + movieId, {
    method: "DELETE"
  }).then(function () {
    console.log("burger has been deleted");
    location.reload();
  })
});