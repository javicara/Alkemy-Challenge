const Movie = require("../models/Movie");
const Gender = require("../models/Genders")

module.exports = {
  v1: {
    getMovies,
    getOneMovie,
    createMovie,
    modifyMovie,
    deleteMovie
  },
};

async function getMovies(req, res) {
  try {
    let movies = await Movie.findAll({ include: [ Gender ] });
    if (movies) {
      res.status(200).json({
        message: " Succesfull",
        data: movies,
      });
    } else {
      res.status(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: " Something goes wrong",
      data: "",
    });
  }
}

async function getOneMovie(req, res) {
  const { id } = req.params;
  try {
    let oneMovie = await Movie.findOne({ where: { movie_id: id } });
    if (oneMovie) {
      res.status(200).json({
        message: " Succesfull",
        data: oneMovie,
      });
    } else {
      res.status(404).json({
        message: "not found",
        data:''
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Something goes wrong",
      data: "",
    });
  }
}

async function createMovie(req, res) {
  const { title, image, score, is_movie,gender_id } = req.body;
  try {
    let newMovie = await Movie.create(
      {
        title,
        image,
        score,
        is_movie,
        gender_id: gender_id || null
      },
      {
        fields: ["title", "image", "score", "is_movie", "gender_id"],
      }
    );
    if (newMovie) {
      res.json({
        message: "succesfully createad",
        data: newMovie,
      });
    }
  } catch (e) {
    console.log("error: ", e.message);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }

}

async function modifyMovie(req, res) {
  const { id } = req.params;
  const { movie_id, title, image, score, is_movie,gender_id } = req.body;
    try {
    let movieModified = await Movie.update(
      
      {
        movie_id: movie_id || id,
        title,
        image,
        score,
        is_movie,
        gender_id: gender_id || null
      },
      { where: {  movie_id: id } }
    );
    if (movieModified==1) {
      res.json({
        message: "succesfully modificated",
      });
    }
  } catch (e) {
    console.log("error: ", e.message);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
}

async function deleteMovie(req, res) {
  try {
    let movie = await Movie.destroy({
      where: { movie_id: req.params.id },
    });
    if (movie) {
      res.status(200).json({
        message: " succesfully deleted",
        data: movie,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: " Erorr: " + error.message,
      data: "",
    });
  }
}