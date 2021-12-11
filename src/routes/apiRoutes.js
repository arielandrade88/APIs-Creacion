const express = require('express')
const router = express.Router()
const genresController = require('../controllers/api/apiGenreController')
const moviesController = require('../controllers/api/apiMoviesController')
const actorsController = require('../controllers/api/apiActorsController')

//genres
router.get('/genres', genresController.list)
router.get('/genres/:id',genresController.detail)

//movies
router.post('/movies/create', moviesController.create);
router.delete('/movies/delete/:id', moviesController.delete);

//actors
router.get('/actors', actorsController.list);
router.get('/actors/:id', actorsController.detail);
router.post('/actors/create', actorsController.create);
router.delete('/actors/delete/:id', actorsController.delete);


module.exports = router
