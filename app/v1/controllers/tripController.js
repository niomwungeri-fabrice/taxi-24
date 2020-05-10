import Trip from "../database/models/Trip";
import constants from "../helpers/constants";
import Rider from "../database/models/Rider";
import Driver from "../database/models/Driver";
const { CREATED, NOT_FOUND } = constants.statusCode;
export default class TripController {
  static async createTrip(req, res) {
    const { riderId, driverId } = req.body;
    const rider = await Rider.findByOne(riderId);
    const driver = await Driver.findByOne(driverId);
    if (!rider.rows[0]) {
      return res.status(NOT_FOUND).send({ message: "Rider does not exist" });
    }
    if (!driver.rows[0]) {
      return res.status(NOT_FOUND).send({ message: "Driver does not exist" });
    }
    const trip = await Trip.create(req.body);
    return res
      .status(CREATED)
      .json({ message: "Trip created successfully", trip });
  }
}
