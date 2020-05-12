import constants from "../helpers/constants";
import Rider from "../database/models/Rider";
import Driver from "../database/models/Driver";
import Trip from "../database/models/Trip";
const { NOT_FOUND } = constants.statusCode;
export default class ModelValidator {
  static async validateDriver(req, res, next) {
    const { driverId } = req.body;
    const driver = await Driver.findByOne(driverId);
    req.driver = driver;
    return driver.rows[0]
      ? next()
      : res.status(NOT_FOUND).json({
          message: `Driver with ${driverId} ID was not found`,
        });
  }
  static async validateRider(req, res, next) {
    const { riderId } = req.body;
    const rider = await Rider.findByOne(riderId);
    req.rider = rider;
    return rider.rows[0]
      ? next()
      : res.status(NOT_FOUND).json({
          message: `Rider with ${riderId} ID was not found`,
        });
  }
  static async validateTrip(req, res, next) {
    const { tripId } = req.body;
    const trip = await Trip.findByOne(tripId || req.params.tripId);
    req.trip = trip;
    return trip.rows[0]
      ? next()
      : res.status(NOT_FOUND).json({
          message: `Trip with ${tripId || req.params.tripId} ID was not found`,
        });
  }
}
