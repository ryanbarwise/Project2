$(document).ready(() => {
  // Target elements from the members page in order to present the users search.
  const cardDiv = $(".card");
  const formEl = $("#watched-check");
  const userReco = $("#user-reco");
  const imgEl = $("<img>");
  const movieNameEl = $("<h1>");
  const actorsEl = $("<h3>");
  const genreEl = $("<h3>");
  const yearEl = $("<h3>");
  const descriptionEl = $("<h3>");
  const watchedEl = $("<input>");
  const labelEl = $("<label>");
  const saveEl = $("#save-button");
  const saveButton = $("<button>");
  const userRating = $("<input>");
  const recomendation = $("<input>");
  const comentsEl = $("<textarea>");
  const comentsLabel = $("<label>");
  const userLabel = $("<label>");
  imgEl.addClass("card-img-top");
  imgEl.attr("class", "moviepic");
  movieNameEl.addClass("card-title");
  actorsEl.addClass("card-title");
  genreEl.addClass("card-title");
  yearEl.addClass("card-title");
  descriptionEl.addClass("card-text");
  watchedEl.attr("type", "checkbox");
  watchedEl.addClass("form-check-input");
  labelEl.addClass("form-check-label");
  labelEl.attr("for", "check");
  saveButton.attr("type", "checkbox");
  saveButton.addClass("btn btn-primary");
  comentsEl.addClass("user-coments");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    console.log(data)
  });

  $("#search-form").on("click", function (event) {
    event.preventDefault();
    console.log("function works");
    let userSearch = $("#user-input").val().trim();
    console.log(userSearch);

    $.ajax({
      url: "https://www.omdbapi.com/?t=" + userSearch + "&plot=short&apikey=trilogy",
      method: "GET"
    }).then(function (response) {
      console.log(response);


      imgEl.attr("src", response.Poster);
      movieNameEl.text(response.Title);
      actorsEl.text("Actors: " + response.Actors);
      genreEl.text("Genre: " + response.Genre);
      yearEl.text("Year released: " + response.Year);
      descriptionEl.text(response.Plot);
      cardDiv.append(imgEl, movieNameEl, actorsEl, genreEl, yearEl, descriptionEl);
      labelEl.text(` Have you watched this movie before?`);
      formEl.append(watchedEl, labelEl);
      saveButton.text("Save");
      saveEl.append(saveButton);
      userRating.addClass("user-rating");
      userRating.attr("placeholder", "Enter your Rating: 1 - 10");
      recomendation.attr("placeholder", "Enter your recomendation: 0 - 10");
      recomendation.addClass("user-reco");
      comentsEl.attr("rows", "3");
      userLabel.text("Enter how you recomend " + response.Title) + ":";
      comentsLabel.text("Coments:");
      userReco.append(userLabel, userRating, recomendation, comentsEl, userReco);
      
      // post(response);

      $(".btn-primary").on("click", () => {
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
    });
  });

});

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