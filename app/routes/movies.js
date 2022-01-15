const moviesController = require('../controllers/movies')
const router = require("express").Router();


router.get('/', moviesController.v1.getMovies);
router.get('/:id', moviesController.v1.getOneMovie);
router.post('/', moviesController.v1.createMovie);
router.put('/:id', moviesController.v1.modifyMovie);
router.delete('/:id', moviesController.v1.deleteMovie);
router.post('/:id', moviesController.v1.addCharacterToMovie2)



module.exports = router;