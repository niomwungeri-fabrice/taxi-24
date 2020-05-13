const Joi = require("@hapi/joi");
import { cleanJoiValidator } from "../helpers/helpers";
import constants from "../helpers/constants";
const { BAD_REQUEST } = constants.statusCode;
export const validateTrip = (req, res, next) => {
  const schema = Joi.object({
    departure: Joi.string().required(),
    destination: Joi.string().required(),
    riderId: Joi.number().integer().required(),
    driverId: Joi.number().integer().required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(BAD_REQUEST)
      .json({ error: cleanJoiValidator(error.details[0].message) });
  return next();
};

export const validateMyLocation = (req, res, next) => {
  const schema = Joi.object({
    myLocation: Joi.string().required(),
  }).options({ allowUnknown: true });
  const { error } = schema.validate(req.query);
  if (error)
    return res
      .status(BAD_REQUEST)
      .json({ error: cleanJoiValidator(error.details[0].message) });
  return next();
};
export const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error } = schema.validate(req.params);
  if (error)
    return res
      .status(BAD_REQUEST)
      .json({ error: cleanJoiValidator(error.details[0].message) });
  return next();
};
