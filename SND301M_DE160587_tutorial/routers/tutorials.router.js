const express = require("express");
const router = express.Router();
const {
    getAllTutorial, 
    createTutorial,
    deleteTutorialById,
    updateTutorialById,
    createTutorialById,
    getTutorialById,
    deleteAllTutorial,
    updateTutorials
} = require("../controllers/tutorial.controller")

router
    .route("/")
    .get(getAllTutorial)
    .post(createTutorial)
    .put(updateTutorials)
    .delete(deleteAllTutorial)
    
router.route("/:tutorialId")
    .get(getTutorialById)
    .post(createTutorialById)
    .put(updateTutorialById)
    .delete(deleteTutorialById)

module.exports = router;