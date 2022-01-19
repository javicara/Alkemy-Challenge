const moviesController = require("../controllers/movies");
const authController = require("../controllers/authUsers");
const router = require("express").Router();

router.get("/", moviesController.v1.getMovies);
router.get("/:id", moviesController.v1.getOneMovie);
router.post(
  "/",
  authController.v1.verifyToken,
  moviesController.v1.createMovie
);
router.put(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.modifyMovie
);
router.delete(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.deleteMovie
);
router.post(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.addCharacterToMovie2
);

module.exports = router;
