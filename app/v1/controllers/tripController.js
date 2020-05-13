import Trip from "../database/queries/Trip";
import constants from "../helpers/constants";
import { calculateDistance, getCoordinates } from "../helpers/helpers";
import Driver from "../database/queries/Driver";
import Invoice from "../database/queries/Invoice";
const { CREATED, OK, CONFLICT } = constants.statusCode;
const { PRICE_PER_KM } = constants.price;
export default class TripController {
  static async createTrip(req, res) {
    const { driver } = req;
    const trip = await Trip.create(req.body);
    await Driver.updateDriver(false, driver.rows[0].id);
    return res
      .status(CREATED)
      .json({ message: "Trip created successfully", trip: trip.rows[0] });
  }

  static async getActiveTrips(req, res) {
    const { rows } = await Trip.getAllActive();
    return res.status(OK).json(rows);
  }
  static async completeTrip(req, res) {
    const { tripId } = req.params;
    const { trip } = req;
    if (trip.rows[0].is_complete) {
      return res.status(CONFLICT).json({ message: "Trip already completed!" });
    }
    const { rows } = await Trip.updateTrip(tripId);

    await Driver.updateDriver(true, rows[0].driver_id);

    const { lon1, lat1, lon2, lat2 } = getCoordinates(
      rows[0].departure,
      rows[0].destination
    );
    const distance = calculateDistance(lat1, lon1, lat2, lon2);

    const invoice = await Invoice.create({
      tripId,
      riderId: rows[0].rider_id,
      driverId: rows[0].driver_id,
      cost: distance * PRICE_PER_KM,
    });

    return res.status(OK).json({
      message: "Trip completed successfully",
      trip: rows[0],
      invoice: invoice.rows[0],
    });
  }
}
