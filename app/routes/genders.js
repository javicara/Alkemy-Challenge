const gendersController = require('../controllers/genders')
const router = require("express").Router();


router.get('/', gendersController.v1.getGenders);
router.get('/:id', gendersController.v1.getOneGender);
router.post('/', gendersController.v1.createGender);
router.put('/:id', gendersController.v1.modifyGender);
router.delete('/:id', gendersController.v1.deleteGender);



module.exports = router;