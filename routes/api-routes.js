// Requiring our models and passport as we've configured it
var db = require('../models');
var passport = require('../config/passport');
var axios = require("axios");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, '/api/login');
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // get movies associated with the user
      //db.User.findOne({where: {id: req.user.id}, include: {model: db.Movie, as: "Movies"}}).then(user => {
       // movies = user.Movies
      //})
      db.Movies.findAll({where: {userID: req.user.id}}).then( movies => {

        res.json({
          email: req.user.email,
          id: req.user.id,
          movies,
        });
      })
    }
  });
 

 




  // Add a movie
  app.post('/api/new', function(req, res) {
    if(!req.user){
      res.json({})
    } else {
      const movieParams = req.body;

      console.log('Movie Data:');
      console.log(req.body);
      db.Movies.create({
        // title: req.body.title,
        // year: req.body.year,
        // genre: req.body.genre,
        ...movieParams,  //..save content of object instead of setting object to specific key
        userID: req.user.id,
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  // Delete a Movie
  app.delete('/api/movie/:id', function(req, res) {
    console.log('movie ID:');
    console.log(req.params.id);
    if(req.user){

      db.Movies.destroy({
        where: {
          id: req.params.id,
          userID: req.user.id
        },
      }).then(function() {
        res.end();
      });
    } else {
      res.end()
    }
  });


app.put("/api/movie/:id", function(req, res) {
console.log("movie ID:") 
console.log(req.params.id);
 db.Movies.update(
    req.body,
    {
      where: {
        id: req.body.id,
        userID: req.params.id,
      }
    }).then(function(results) {
    res.json(results);
  });
});



// api calling OMDB
app.get("/api/home/movies", function(req, res) {
  
  getMovie();

  async function getMovie() {
    try {
      const moviesArray = [
        "Intolerant",
        "Elvis from Outer Space",
        "Group Therapy",
        "The Beach House",
        "Endgame",
        "The Old Guard",
        "Parallax",
        "Greyhound",
        "Ghost",
        "Archive",
        "We Are One",
        "The Players",
        "The Sandman", 
        "Saint Maud", 
        "Radioactive", 
        "The Informer", 
        "Unhinged"];
      const moviesArrayLenght = moviesArray.length;
      const hbsObject = []
      for (let i = 0; i < moviesArrayLenght; i++) {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?t=${moviesArray[i]}&apikey=trilogy`
      )
      hbsObject.push(data);
      console.log(hbsObject);
    }

      return res.json(hbsObject);

    } catch (err) {
      console.log(err);
    }
  }
});
};