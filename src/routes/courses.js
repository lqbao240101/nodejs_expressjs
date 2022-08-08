const express = require('express');
const newsRouter = express.Router();

const courseController = require('../app/controllers/CourseController');

//NewController.index
newsRouter.get('/create', courseController.create);
newsRouter.post('/store', courseController.store);
newsRouter.post('/handle-form-actions', courseController.handleFormActions);
newsRouter.get('/:id/edit', courseController.edit);
newsRouter.put('/:id', courseController.update);
newsRouter.patch('/:id/restore', courseController.restore);
newsRouter.delete('/:id', courseController.delete);
newsRouter.delete('/:id/force', courseController.forceDelete);
newsRouter.get('/:slug', courseController.show);

module.exports = newsRouter;
