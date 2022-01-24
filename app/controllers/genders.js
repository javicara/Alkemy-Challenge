const Gender = require("../models/Genders");

module.exports = {
  v1: {
    getGenders,
    getOneGender,
    createGender,
    modifyGender,
    deleteGender,
  },
};

async function getGenders(req, res) {
  try {
    let genders = await Gender.findAll();
    if (genders) {
      res.status(200).json({
        message: " Succesfull",
        data: genders,
      });
    } else {
      console.log("aca");
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
}

async function getOneGender(req, res) {
  const { id } = req.params;
  try {
    let oneGender = await Gender.findOne({ where: { gender_id: id } });
    if (oneGender) {
      res.status(200).json({
        message: " Succesfull",
        data: oneGender,
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

async function createGender(req, res) {
  const { name, image } = req.body;
  try {
    let newGender = await Gender.create(
      {
        name,
        image,
      },
      {
        fields: ["name", "image"],
      }
    );
    if (newGender) {
      res.json({
        message: "succesfully createad",
        data: newGender,
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

async function modifyGender(req, res) {
  const { id } = req.params;
  const { gender_id, name, image } = req.body;
  try {
    let genderModified = await Gender.update(
      {
        gender_id: gender_id || id,
        name,
        image,
      },
      { where: { gender_id: id } }
    );
    if (genderModified == 1) {
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

async function deleteGender(req, res) {
  try {
    let gender = await Gender.destroy({
      where: { gender_id: req.params.id },
    });
    if (gender) {
      res.status(200).json({
        message: " succesfully deleted",
        data: gender,
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
