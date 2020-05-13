import Driver from "../database/queries/Driver";
import { calculateDistance } from "../helpers/helpers";
import constants from "../helpers/constants";
const { OK, BAD_REQUEST, NOT_FOUND } = constants.statusCode;
export default class DriverController {
  static async getAllDrivers(req, res) {
    const { rows } = await Driver.getAll();
    return res.status(OK).json(rows);
  }
  static async getAvailableDrivers(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    return res.status(OK).json(rows);
  }
  static async getAvailableDriversWithInRange(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    const { myLocation, range } = req.query;
    if (!myLocation) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "myLocation is a required parameter field" });
    }
    const ridersLocation = myLocation.split(",");
    let driversWithInRange = [];
    rows.forEach((driver) => {
      const location = driver.location.split(",");
      const distance = calculateDistance(
        location[0],
        location[1],
        ridersLocation[0],
        ridersLocation[1]
      );
      if (distance <= (range || 3)) {
        driversWithInRange.push({ driver, driverRange: `${distance} KM` });
      }
    });
    return driversWithInRange.length < 1
      ? res.status(OK).json({
          message: "No drivers within 3 KM",
          options: "user <range> query parameter to increase the range",
        })
      : res.status(OK).json(driversWithInRange);
  }
  static async findDriverById(req, res) {
    const { id } = req.params;
    const { rows } = await Driver.findByOne(id);
    if (!rows[0]) {
      return res.status(NOT_FOUND).send({ message: "Driver does not exist" });
    }
    return res.status(OK).json(rows[0]);
  }
}
