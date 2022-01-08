const Character = require("../models/Character");

module.exports = {
  v1: {
    // Initial version
    createCharacter,
    getCharacters,
    getOneCharacter,
    getCharacterName,
    getCharacterAge,
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
  const {character_id, name, image, age, weight, history } = req.body;
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
  try {
    let characters = await Character.findAll(({attributes: ['name', 'image']}));

    if (characters) {
      res.status(200).json({
        message: " Succesfull",
        data: characters,
      });
    } else {
      res.status(404).json({
        message: "not found",
        data:''})
      }
  } catch (error) {
    res.status(500).json({
      message: " Something goes wrong",
      data: "",
    });
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
    }else{
      res.status(404).json({
        message: "not found",
        data:''
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Erorr: " + error.message,
      data: "",
    });
  }
}

async function getCharacterName(req, res) {
  const { name } = req.params;
  try {
    let character = await Character.findOne({
      where: {
        name: name,
      },
    });

    if (character) {
      res.status(200).json({
        message: " succesfull",
        data: character,
      });
    }else{
      res.status(404).json({
        message: "not found",
        data:''
      });
    }
  } catch (error) {
    res.status(500).json({
      message: " Erorr: " + error.message,
      data: "",
    });
  }
}

async function getCharacterAge(req, res) {
  const { age } = req.params;
  console.log(age);
  try {
    let character = await Character.findOne({
      where: {
        age: age,
      },
    });

    if (character) {
      res.status(200).json({
        message: " succesfull",
        data: character,
      });
    }else{
      res.status(404).json({
        message: "not found",
        data:''
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
