const Tutorial = require("../models/tutorial");

const getAllTutorial = async (req, res, next) => {
	const tutorials = await Tutorial.find({});
  	return res.json(tutorials)
};

const createTutorial = async (req, res, next) => {
	const newTutorial = new Tutorial(req.body);
	await newTutorial.save();

	return res.json(newTutorial);
};

const updateTutorials = async (req, res, next) => {
	
	return res.json("Operation not supported");
};

const deleteAllTutorial = async (req, res, next) => {
	await Tutorial.deleteMany({});
	
	return res.json("Successfully deleted");
};

const getTutorialById = async (req, res, next) => {
    console.log(req.params.tutorialId);
	const tutorial = await Tutorial.findById(req.params.tutorialId);
	
	return res.json(tutorial);
};
const createTutorialById = async (req, res, next) => {
	
	return res.json("Operation not supported");
};

const updateTutorialById = async (req, res, next) => {
	const updatedTutorial = new Tutorial(req.body);
	const tutorial = await Tutorial.findByIdAndUpdate(
		req.param.tutorialId,
		updatedTutorial,
		{
			new: true,
		}
	);

	
	return res.json(tutorial);
};

const deleteTutorialById = async (req, res, next) => {
    await Tutorial.findByIdAndRemove(req.params.tutorialId)
    
	return res.json("Successfully delete Tutorial:id=" +req.param.tutorialId);
}

module.exports = {
    getAllTutorial, 
    createTutorial,
    deleteTutorialById,
    updateTutorialById,
    createTutorialById,
    getTutorialById,
    deleteAllTutorial,
    updateTutorials
}