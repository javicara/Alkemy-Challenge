const router = require("express").Router();
const characters = require("../controllers/characters");
const authController = require("../controllers/authUsers");
/**
 * @swagger
 * components:
 *  schemas:
 *    Character:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name of the character
 *        image:
 *          type: string
 *          description: the image of the character
 *        age:
 *          type: integer
 *          description: the age of the character
 *        weight:
 *          type: integer
 *          description: weight of the character
 *        history:
 *          type: string
 *          description: the history of the character
 *      required:
 *        - name
 *        - image
 *        - age
 *      example: 
 *        name: Harry Potter
 *        image: https://static.wikia.nocookie.net/disney/images/b/ba/A.R.F.png
 *        age: 20
 *        weight: 50
 *        history: a fantastic history
 */  

/**
 * @swagger
 * tags:
 *  name: Characters
 *  description: The Characters managing API  
 */


/**
 * @swagger
 *  /api/v1/characters:
 *  get:
 *    summary: Returns the list of all the characters
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: To filter charcaters by name
 *      - in: query
 *        name: age
 *        schema:
 *          type: string
 *        description:  To filter charcaters by age
 *      - in: query
 *        name: movies
 *        schema:
 *          type: string
 *        description:  To filter charcaters by films or series where acted 
 *    tags: [Characters]
 *    responses:
 *      200:
 *        description: all the characters
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Character'
 *            
 */
router.get("/", characters.v1.getCharacters);
/**
 * @swagger
 *  /api/v1/characters/{id}:
 *  get:
 *    summary: Get a character by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the character id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Characters]
 *    responses:
 *      200:
 *        description: one character description by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Movie'
 *      404: 
 *        description: character was not found
 *            
 */
router.get("/:id", characters.v1.getOneCharacter);

/**
 * @swagger
 *  /api/v1/characters:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create a new character
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Characters]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Character'
 *    responses:
 *      200:
 *        description: A new Character was created!
 */

router.post("/", authController.v1.verifyToken, characters.v1.createCharacter);

/**
 * @swagger
 *  /api/v1/characters/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a character by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the character id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Characters]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Character'
 *    responses:
 *      200:
 *        description: A Character was modified!
 */


router.put(
  "/:id",
  authController.v1.verifyToken,
  characters.v1.modifyCharacter
);

/**
 * @swagger
 *  /api/v1/characters/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: remove a character or serie by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the character id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Characters]
 *    responses:
 *      200:
 *        description: one character was succesfully deleted
 */

router.delete(
  "/:id",
  authController.v1.verifyToken,
  characters.v1.deleteCharacter
);
module.exports = router;
