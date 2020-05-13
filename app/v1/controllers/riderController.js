import Rider from "../database/queries/Rider";
import constants from "../helpers/constants";
import {
  calculateDistance,
  arraySorter,
  getCoordinates,
} from "../helpers/helpers";
import Driver from "../database/queries/Driver";

const { OK, NOT_FOUND, BAD_REQUEST } = constants.statusCode;
export default class RiderControllers {
  static async getAllRiders(req, res) {
    const { rows } = await Rider.getAll();
    return rows.length < 1
      ? res.status(NOT_FOUND).json({
          message: "No riders found!",
        })
      : res.status(OK).json(rows);
  }
  static async getRiderById(req, res) {
    const { id } = req.params;
    const { rows } = await Rider.findByOne(id);
    if (!rows[0]) {
      return res.status(NOT_FOUND).send({ message: "Rider does not exist" });
    }
    return res.status(OK).json(rows[0]);
  }

  static async getClosestDrivers(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    const { myLocation, threshold } = req.query;
    const driversDistance = [];
    rows.map((driver) => {
      const { lon1, lat1, lon2, lat2 } = getCoordinates(
        myLocation,
        driver.location
      );
      const distance = calculateDistance(lon1, lat1, lon2, lat2);
      driver["distance"] = distance;
      driversDistance.push(driver);
    });
    const closest = arraySorter(driversDistance).slice(0, threshold || 3);
    return closest.length < 1
      ? res.status(OK).json({
          message: "No closest drivers around!",
          options:
            "add <threshold> in url query parameter to increase the threshold",
        })
      : res.status(OK).json(closest);
  }
}
