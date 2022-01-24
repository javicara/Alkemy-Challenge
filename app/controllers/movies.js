const Movie = require("../models/Movie");
const Gender = require("../models/Genders");
const Character = require("../models/Character");
const CharacterMovies = require("../models/Characters_Movies");

module.exports = {
  v1: {
    getMovies,
    getOneMovie,
    createMovie,
    modifyMovie,
    deleteMovie,
    addCharacterToMovie,
    addCharacterToMovie2,
  },
};

async function getMovies(req, res) {
  if (req.query.name) {
    try {
      let movies = await Movie.findAll({
        where: { title: req.query.name },
        attributes: ["title", "image"],
      });

      if (movies) {
        res.status(200).json({
          message: " Succesfull",
          data: movies,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: "",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: " Something goes wrong",
        data: "",
      });
    }
  } else if (req.query.genre) {
    try {
      let movies = await Movie.findAll({
        attributes: ["title", "image", "fecha_de_creacion", "score"],
        include: [
          {
            model: Gender,
            attributes: ["name"],
            where: { gender_id: req.query.genre },
          },
        ],
      });

      if (movies) {
        res.status(200).json({
          message: " Succesfull",
          data: movies,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: "",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: " Something goes wrong",
        data: "",
      });
    }
  } else if (req.query.order) {
    try {
      let movies = await Movie.findAll({
        attributes: ["title", "image", "fecha_de_creacion"],
        order: [["fecha_de_creacion", req.query.order]],
      });

      if (movies) {
        res.status(200).json({
          message: " Succesfull",
          data: movies,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: "",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: " Something goes wrong",
        data: "",
      });
    }
  } else {
    try {
      let movies = await Movie.findAll({
        attributes: ["image", "title", "fecha_de_creacion"],
      });
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
}

async function getOneMovie(req, res) {
  const { id } = req.params;
  try {
    let oneMovie = await Movie.findOne({
      where: { movie_id: id },
      include: [
        {
          model: Gender,
          attributes: ["name"],
        },
        {
          model: Character,
          attributes: ["name", "image", "age", "weight", "history"],
        },
      ],
    });
    if (oneMovie) {
      res.status(200).json({
        message: " Succesfull",
        data: oneMovie,
      });
    } else {
      res.status(404).json({
        message: "not found",
        data: "",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: " Something goes wrong",
      data: "",
    });
  }
}

async function createMovie(req, res) {
  const { title, image, score, is_movie, gender_id, fecha_de_creacion } =
    req.body;
  try {
    let newMovie = await Movie.create(
      {
        title,
        image,
        score,
        is_movie,
        gender_id: gender_id || null,
        fecha_de_creacion,
      },
      {
        fields: [
          "title",
          "image",
          "score",
          "is_movie",
          "gender_id",
          "fecha_de_creacion",
        ],
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
  const { movie_id, title, image, score, is_movie, gender_id } = req.body;
  try {
    let movieModified = await Movie.update(
      {
        movie_id: movie_id || id,
        title,
        image,
        score,
        is_movie,
        gender_id: gender_id || null,
      },
      { where: { movie_id: id } }
    );
    if (movieModified == 1) {
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
    else{
      res.status(404).json({
        message: "not found",
        data: [],
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

async function addCharacterToMovie(req, res) {
  console.log("addCharacterToMovie");
  // a la peli que pasan el id como paramatro le agregamos el charcacter_id del body
  const { id } = req.params;
  const { character_id } = req.body;
  try {
    let newCharacterMovies = await CharacterMovies.create(
      {
        movieMovieId: id,
        characterCharacterId: character_id,
      },
      {
        fields: ["movieMovieId", "characterCharacterId"],
      }
    );

    if (newCharacterMovies) {
      res.json({
        message: "succesfully createad",
        data: newCharacterMovies,
      });
    }
    console.log(newCharacterMovies);
  } catch (error) {
    console.log(error.message);
  }
}

async function addCharacterToMovie2(req, res) {
 
  const { id } = req.params;
  const { character_id } = req.body;
  try {
    let oneMovie = await Movie.findOne({ where: { movie_id: id } });
    let oneCharacter = await Character.findOne({
      where: { character_id: character_id },
    });

    await oneMovie.addCharacters(oneCharacter);

    if (oneCharacter && oneMovie) {
      res.json({
        message: `character with id: ${character_id} was added succesfully to movie with id: ${id}`,
      });
    }
    //console.log(oneCharacter, 'one Character ');
  } catch (error) {
    console.log(error.message);
  }
}
