import Trip from "../database/models/Trip";
import constants from "../helpers/constants";
const { CREATED } = constants.statusCode;
export default class TripController {
  static async createTrip(req, res) {
    // const {
    //   departure,
    //   destination,
    //   costAmount,
    //   coordinates,
    //   riderId,
    //   driverId,
    // } = req.body;
    const { rows } = await Trip.create(req.body);
    return res
      .status(CREATED)
      .json({ message: "Trip created successfully", trip: rows[0] });
  }
}
