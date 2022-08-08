const express = require('express');
const newsRouter = express.Router();

const meController = require('../app/controllers/MeController');

//NewController.index
newsRouter.get('/stored/courses', meController.storedCourses);
newsRouter.get('/trash/courses', meController.trashCourses);

module.exports = newsRouter;
