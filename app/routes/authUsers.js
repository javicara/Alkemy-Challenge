const router = require("express").Router();
const authController = require("../controllers/authUsers");

router.post('/login',authController.v1.logUser)

router.post('/register', authController.v1.registerUser)

router.get('/secret', authController.v1.verifyToken ,authController.v1.rutaProtegidaController)


module.exports = router;
