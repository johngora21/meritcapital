import { HttpError } from './error.js';

export const validate = (schema) => async (req, _res, next) => {
  try {
    if (!schema) return next();
    const data = { body: req.body, params: req.params, query: req.query };
    await schema.validateAsync(data, { abortEarly: false, allowUnknown: true });
    next();
  } catch (err) {
    next(new HttpError(422, 'Validation failed', err.details || err.message));
  }
};

export default validate;





