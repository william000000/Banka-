import joi from 'joi';

const userSchema = joi.object().keys({
  id: joi.number().required(),
  firstname: joi.string().alphanum().min(3).required(),
  lastname: joi.string().alphanum().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  type: joi.string().min(5).required(),
  isAdmin: joi.boolean().required(),
});

export default userSchema;