// Aaron needs to tell me what route I'm going to do the GET request to / uses Axios in order to send data.
$.ajax("/api/movies", {
  type: "GET",
}).then(
  function(data) {
    console.log(data);
    // do something with the omdb
  }
);