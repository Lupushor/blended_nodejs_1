const Joi = require('joi');

const addTaskValidationSchema = Joi.object({
  title: Joi.string().required(),
  completed: Joi.boolean().default(false),
});

const updateTaskValidationSchema = Joi.object()
  .keys({
    title: addTaskValidationSchema.extract('title').optional(),
    completed: addTaskValidationSchema.extract('completed').optional(),
  }).or('title', 'completed');

module.exports = {
  addTaskValidationSchema,
  updateTaskValidationSchema,
};