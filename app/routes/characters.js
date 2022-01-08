const router = require("express").Router();
const characters = require("../controllers/characters");

router.get("/", characters.v1.getCharacters);
router.get("/:id", characters.v1.getOneCharacter);
router.get("/:name", characters.v1.getCharacterName);
router.get("/:age", characters.v1.getCharacterAge);

router.post("/", characters.v1.createCharacter);
router.delete("/:id", characters.v1.deleteCharacter);
router.put("/:id", characters.v1.modifyCharacter);

module.exports = router;
