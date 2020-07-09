module.exports = function(sequelize, DataTypes) {
  // userMovie
  /*
  id | title | year | note | rating | userID
  45 | titanic |1996 | too long, but underrated | 8/10 | 65
  46 | titanic |1996 | Love anything with Dicaprio | 9/10 | 50
  */

  //first three are for movies from Aaron's api
  var Movies = sequelize.define("UserMovies", {
    // "UserMovies"
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [4],
      },
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    userRating: {
      type: DataTypes.INTEGER,
      isNumeric: true,
      max: 10,
      min: 1,
    },

    watched: {
      type: DataTypes.BOOLEAN,
      default: false,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    list: {
      // watched, weekend-binge, save for rainy day list, etc
      type: DataTypes.TEXT,
      allowNull: true,
    },

    recommend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });
  return Movies;
};
