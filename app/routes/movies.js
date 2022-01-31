const moviesController = require("../controllers/movies");
const authController = require("../controllers/authUsers");
const router = require("express").Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Title of the film or serie
 *        image:
 *          type: string
 *          description: the image of the film or serie
 *        fecha_de_creacion:
 *          type: date
 *          description: creation date of the film or serie
 *        score:
 *          type: integer
 *          description: the score of the film or serie
 *        is_movie:
 *          type: boolean
 *          description: describe if its a film or not
 *        gender_id:
 *          type: integer
 *          description: it's a foreingKey to define the gender of the film or serie
 *      required:
 *        - image
 *        - title
 *        - fecha_de_creacion
 *      example: 
 *        title: harry potter y la camara de los secretos
 *        image: https://static.wikia./images/b/ba/A.R.F.png
 *        score: 9
 *        is_movie: true
 *        fecha_de_creacion: 11/01/2000
 */  

/**
 * @swagger
 * tags:
 *  name: Films/Series
 *  description: The Films and Series managing API  
 */

/**
 * @swagger
 *  /api/v1/movies:
 *  get:
 *    summary: Returns the list of all the films and series
 *    parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: To filter films or series by name 
 *      - in: query
 *        name: genre
 *        schema:
 *          type: string
 *        description: To filter films or serie by genreId 
 *      - in: query
 *        name: order
 *        schema:
 *          type: string
 *        description: To order the list ASC or DESC 
 *    tags: [Films/Series]
 *    responses:
 *      200:
 *        description: all the movies and films
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *            
 */
router.get("/", moviesController.v1.getMovies);
/**
 * @swagger
 *  /api/v1/movies/{id}:
 *  get:
 *    summary: Get a film or serie by id
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the film or serie id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    responses:
 *      200:
 *        description: one film or serie description by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Movie'
 *      404: 
 *        description: Film/serie was not found
 *            
 */
router.get("/:id", moviesController.v1.getOneMovie);

/**
 * @swagger
 *  /api/v1/movies/{id}/characters:
 *  get:
 *    summary: Get the characters of a film or serie passing the  filmId by parameter
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the film or serie id 
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    responses:
 *      200:
 *        description: list of charcaters
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Movie'
 *      404: 
 *        description: Film/serie was not found
 *            
 */
router.get("/:id/characters", moviesController.v1.getCharactersOfMovie);


/**
 * @swagger
 *  /api/v1/movies:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Create a new film or serie
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: A new Movie was created!
 */
router.post(
  "/",
  authController.v1.verifyToken,
  moviesController.v1.createMovie
);
/**
 * @swagger
 *  /api/v1/movies/{id}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    summary: Update a film or serie by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the film or serie id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: A Movie was modified!
 */
router.put(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.modifyMovie
);




/**
 * @swagger
 *  /api/v1/movies/{id}/genre/{genreId}:
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    summary: Add a gender to a Film
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the film or serie id
 *      - in: path
 *        name: genreId
 *        description: the genre id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    responses:
 *      200:
 *        description: succesfully modificated!
 */

router.patch(
  "/:id/genre/:genreId",
  authController.v1.verifyToken,
  moviesController.v1.addGenreToMovie
);
/**
 * @swagger
 *  /api/v1/movies/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    summary: remove a film or serie by id
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the film or serie id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    responses:
 *      200:
 *        description: one movie or film was succesfully deleted
 */
router.delete(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.deleteMovie
);
/**
 * @swagger
 *  /api/v1/movies/{id}:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Add a character to a movie or serie passed by parameter in path
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *      - in: path
 *        name: id
 *        description: the film or serie id
 *        schema:
 *          type: string
 *        required: true
 *    tags: [Films/Series]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties: 
 *              character_id:
 *                type: integer
 *                description: The Character id to add for the film or serie 
 *              
 *    responses:
 *      200:
 *        description: The charcater was added to the movie 
 */
router.post(
  "/:id",
  authController.v1.verifyToken,
  moviesController.v1.addCharacterToMovie2
);

module.exports = router;
