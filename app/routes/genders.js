const gendersController = require("../controllers/genders");
const authController = require("../controllers/authUsers");
const router = require("express").Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Genre:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name of the Genre
 *        image:
 *          type: string
 *          description: the image of the Genre
 *        
 *      required:
 *        - name
 *        - image
 *      example: 
 *        name: Ciencia Ficción
 *        image: https://static.wikia.nocookie.net/disney/images/b/ba/A.R.F.png
 */  

/**
 * @swagger
 * tags:
 *  name: Genres
 *  description: The Genres managing API  
 */

/**
 * @swagger
 *  /api/v1/genders:
 *  get:
 *    summary: Returns the list of all the genders
 *    tags: [Genres]
 *    responses:
 *      200:
 *        description: all the genders
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Genre'
 *            
 */
router.get("/", gendersController.v1.getGenders);
/**
 * @swagger
 *  /api/v1/genders/{id}:
 *  get:
 *    summary: Get a gender by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the gender id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Genres]
 *    responses:
 *      200:
 *        description: one gender description by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Genre'
 *      404: 
 *        description: gender was not found
 *            
 */
router.get("/:id", gendersController.v1.getOneGender);
/**
 * @swagger
 *  /api/v1/genders:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create a new gender
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Genres]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: A new Genre was created!
 */

router.post(
  "/",
  authController.v1.verifyToken,
  gendersController.v1.createGender
);

/**
 * @swagger
 *  /api/v1/genders/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a gender by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the gender id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Genres]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: A Genre was modified!
 */

router.put(
  "/:id",
  authController.v1.verifyToken,
  gendersController.v1.modifyGender
);


/**
 * @swagger
 *  /api/v1/genders/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: remove a gender or serie by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the gender id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Genres]
 *    responses:
 *      200:
 *        description: one gender was succesfully deleted
 */


router.delete(
  "/:id",
  authController.v1.verifyToken,
  gendersController.v1.deleteGender
);

module.exports = router;
