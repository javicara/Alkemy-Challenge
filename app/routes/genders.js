const gendersController = require("../controllers/genders");
const authController = require("../controllers/authUsers");
const router = require("express").Router();

router.get("/", gendersController.v1.getGenders);
router.get("/:id", gendersController.v1.getOneGender);
router.post(
  "/",
  authController.v1.verifyToken,
  gendersController.v1.createGender
);
router.put(
  "/:id",
  authController.v1.verifyToken,
  gendersController.v1.modifyGender
);
router.delete(
  "/:id",
  authController.v1.verifyToken,
  gendersController.v1.deleteGender
);

module.exports = router;
