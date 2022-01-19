const router = require("express").Router();
const characters = require("../controllers/characters");
const authController = require("../controllers/authUsers");

router.get("/", characters.v1.getCharacters);
router.get("/:id", characters.v1.getOneCharacter);
router.post("/", authController.v1.verifyToken, characters.v1.createCharacter);
router.delete(
  "/:id",
  authController.v1.verifyToken,
  characters.v1.deleteCharacter
);
router.put(
  "/:id",
  authController.v1.verifyToken,
  characters.v1.modifyCharacter
);

module.exports = router;
