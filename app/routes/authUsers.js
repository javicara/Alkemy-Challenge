const router = require("express").Router();
const authController = require("../controllers/authUsers");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        user_name:
 *          type: string
 *          description: The user name
 *        email:
 *          type: string
 *          description: the user email adress
 *        password:
 *          type: string
 *          description: the password of the user
 *      required:
 *        - email
 *        - password
 *      example: 
 *        user_name: JuanCarlos
 *        password: password
 *        email: juancarlos@gmail.com
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * 
 * 
 */       

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The User Authentification managing API  
 */

/**
 * @swagger
 *  /api/v1/auth/login:
 *  post:
 *    summary: User Sign in
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User is logged! A token was provided
 *      401:
 *        description: The password was invalid
 */
router.post("/login", authController.v1.logUser);


/**
 * @swagger
 *  /api/v1/auth/register:
 *  post:
 *    summary: Create a New User
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: User was created! A token was provided
 *      406:
 *        description: Email and password are required
 */
router.post("/register", authController.v1.registerUser);

router.get(
  "/secret",
  authController.v1.verifyToken,
  authController.v1.rutaProtegidaController
);

module.exports = router;
