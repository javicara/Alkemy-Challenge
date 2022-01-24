const Character = require("../models/Character");
const Movie = require("../models/Movie");

module.exports = {
  v1: {
    // Initial version
    createCharacter,
    getCharacters,
    getOneCharacter,
    deleteCharacter,
    modifyCharacter,
  },
};

async function createCharacter(req, res) {
  const { name, image, age, weight, history } = req.body;
  try {
    let newCharacter = await Character.create(
      {
        name,
        image,
        age,
        weight,
        history,
      },
      {
        fields: ["name", "image", "age", "weight", "history"],
      }
    );
    if (newCharacter) {
      res.json({
        message: "succesfully createad",
        data: newCharacter,
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

async function modifyCharacter(req, res) {
  const { id } = req.params;
  const { character_id, name, image, age, weight, history } = req.body;
  try {
    let characterModified = await Character.update(
      {
        character_id: character_id || id,
        name,
        image,
        age,
        weight,
        history,
      },
      { where: { character_id: id } }
    );
    if (characterModified) {
      res.json({
        message: "succesfully modificated",
        data: characterModified,
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

async function getCharacters(req, res) {
  if (req.query.name) {
    try {
      let characters = await Character.findAll({
        where: { name: req.query.name },
        attributes: ["name", "image"],
      });

      if (characters) {
        res.status(200).json({
          message: " Succesfull",
          data: characters,
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
  } else if (req.query.age) {
    try {
      let characters = await Character.findAll({
        where: { age: req.query.age },
        attributes: ["name", "image", "age"],
      });

      if (characters) {
        res.status(200).json({
          message: " Succesfull",
          data: characters,
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
  } else if (req.query.movies) {
    try {
      let characters = await Character.findAll({
        include: [
          {
            model: Movie,
            attributes: [],
            where: { movie_id: req.query.movies },
          },
        ],
      });

      if (characters) {
        res.status(200).json({
          message: " Succesfull",
          data: characters,
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
  } else {
    try {
      let characters = await Character.findAll({
        attributes: ["name", "image"],
      });

      if (characters) {
        res.status(200).json({
          message: " Succesfull",
          data: characters,
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
  }
}
async function getOneCharacter(req, res) {
  const { id } = req.params;
  try {
    let characters = await Character.findOne({
      where: {
        character_id: id,
      },
    });

    if (characters) {
      res.status(200).json({
        message: " succesfull",
        data: characters,
      });
    } else {
      res.status(404).json({
        message: "not found",
        data: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Erorr: " + error.message,
      data: "",
    });
  }
}

async function deleteCharacter(req, res) {
  try {
    let character = await Character.destroy({
      where: { character_id: req.params.id },
    });
    if (character) {
      res.status(200).json({
        message: " succesfully deleted",
        data: character,
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
