const router = require("express").Router()
const isAuthorized = require("../../middlewares/isAuthorized")
const {moviesControllers} = require("../../controllers")

router.use(isAuthorized)
router.post("/addRemoveFavorites",moviesControllers.addRemoveFavorite)
router.get("/getAllFavorites",moviesControllers.getAllFavorites)

module.exports =router