import Driver from "../database/models/Driver";
import constants from "../helpers/constants";
import Rider from "../database/models/Rider";
const { NOT_FOUND } = constants.statusCode;
export default class ModelValidator {
  static async driverNotFound(req, res, next) {
    const driver = await Driver.findByOne(req.params.id);
    const { rows } = driver;
    return rows[0]
      ? next()
      : res.status(NOT_FOUND).json({ message: "Driver was not found" });
  }
  static async riderNotFound(req, res, next) {
    const rider = await Rider.findByOne(req.params.id);
    const { rows } = rider;
    return rows[0]
      ? next()
      : res.status(NOT_FOUND).json({ message: "Rider was not found" });
  }
}
