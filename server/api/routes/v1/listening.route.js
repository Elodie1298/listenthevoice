const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/listening.controller');
//const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   listListenings,
//   createListening,
//   replaceListening,
//   updateListening,
// } = require('../../validations/listening.validation');

const router = express.Router();

/**
 * Load listening when API with listeningId route parameter is hit
 */
router.param('listeningId', controller.load);


router
  .route('/')
  /**
   * @api {get} v1/listenings List Listenings
   * @apiDescription Get a list of listenings
   * @apiVersion 1.0.0
   * @apiName ListListenings
   * @apiGroup Listening
   * @apiPermission admin
   *
   * //@apiHeader {String} Athorization  Listening's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Listenings per page
   * @apiParam  {String}             [name]       Listening's name
   * @apiParam  {String}             [emotion]    Listening's emotion
   * @apiParam  {String}             [category]   Listening's category
   * @apiParam  {String}             [userId]     Listening's userId
   *
   * @apiSuccess {Object[]} listenings List of listenings.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated listenings can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get( controller.list)
  // .patch( controller.updateUserIdObj)
  /**
   * @api {post} v1/listenings Create Listening
   * @apiDescription Create a new listening
   * @apiVersion 1.0.0
   * @apiName CreateListening
   * @apiGroup Listening
   * @apiPermission admin
   *
   * //@apiHeader {String} Athorization  Listening's access token
   *
   * @apiParam  {String}      name        Listening's name
   * @apiParam  {String}      emotion     Listening's emotion
   * @apiParam  {String}      category    Listening's category
   * @apiParam  {String}      userId      Listening's userId
   *
   * @apiSuccess (Created 201) {String}  id         Listening's id
   * @apiSuccess (Created 201) {String}  name       Listening's name
   * @apiSuccess (Created 201) {String}  emotion    Listening's emotion
   * @apiSuccess (Created 201) {String}  category   Listening's category
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated listenings can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(controller.create);


router
  .route('/:listeningId')
  /**
   * @api {get} v1/listenings/:listeningId Get Listening
   * @apiDescription Get listening information
   * @apiVersion 1.0.0
   * @apiName GetListening
   * @apiGroup Listening
   * @apiPermission listening
   *
   * //@apiHeader {String} Athorization  Listening's access token
   *
   * @apiSuccess {String}  id         Listening's id
   * @apiSuccess {String}  name       Listening's name
   * @apiSuccess {String}  emotion    Listening's emotion
   * @apiSuccess {String}  category   Listening's category
   * @apiSuccess {String}  userId     Listening's userId
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated listenings can access the data
   * @apiError (Forbidden 403)    Forbidden    Only listening with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Listening does not exist
   */
  .get( controller.get)
  /**
   * @api {put} v1/listenings/:id Replace Listening
   * @apiDescription Replace the whole listening document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceListening
   * @apiGroup Listening
   * @apiPermission listening
   *
   * @apiHeader {String} Athorization  Listening's access token
   *
   * @apiParam  {String}             email     Listening's email
   * @apiParam  {String{6..128}}     password  Listening's password
   * @apiParam  {String{..128}}      [name]    Listening's name
   * @apiParam  {String=listening,admin}  [role]    Listening's role
   * (You must be an admin to change the listening's role)
   *
   * @apiSuccess {String}  id         Listening's id
   * @apiSuccess {String}  name       Listening's name
   * @apiSuccess {String}  email      Listening's email
   * @apiSuccess {String}  role       Listening's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated listenings can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only listening with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Listening does not exist
   */
  //.put( controller.replace)
  /**
   * @api {patch} v1/listenings/:id Update Listening
   * @apiDescription Update some fields of a listening document
   * @apiVersion 1.0.0
   * @apiName UpdateListening
   * @apiGroup Listening
   * @apiPermission listening
   *
   * @apiHeader {String} Athorization  Listening's access token
   *
   * @apiParam  {String}             email     Listening's email
   * @apiParam  {String{6..128}}     password  Listening's password
   * @apiParam  {String{..128}}      [name]    Listening's name
   * @apiParam  {String=listening,admin}  [role]    Listening's role
   * (You must be an admin to change the listening's role)
   *
   * @apiSuccess {String}  id         Listening's id
   * @apiSuccess {String}  name       Listening's name
   * @apiSuccess {String}  email      Listening's email
   * @apiSuccess {String}  role       Listening's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated listenings can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only listening with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Listening does not exist
   */
  //.patch( controller.update)
  /**
   * @api {patch} v1/listenings/:id Delete Listening
   * @apiDescription Delete a listening
   * @apiVersion 1.0.0
   * @apiName DeleteListening
   * @apiGroup Listening
   * @apiPermission listening
   *
   * //@apiHeader {String} Authorization  Listening's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated listenings can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only listening with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Listening does not exist
   */
  .delete( controller.remove);


module.exports = router;
