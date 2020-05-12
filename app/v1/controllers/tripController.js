import Trip from "../database/models/Trip";
import constants from "../helpers/constants";
import { calculateDistance, getCoordinates } from "../helpers/helpers";
import Driver from "../database/models/Driver";
import Invoice from "../database/models/Invoice";
const { CREATED, NOT_FOUND, OK, CONFLICT } = constants.statusCode;
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
    const cost = distance * 700;
    const invoice = await Invoice.create({
      tripId,
      riderId: rows[0].rider_id,
      driverId: rows[0].driver_id,
      cost,
    });
    return res.status(OK).json({
      message: "Trip completed successfully",
      invoiceId: invoice.rows[0].id,
      cost,
      trip: rows[0],
    });
  }
}
