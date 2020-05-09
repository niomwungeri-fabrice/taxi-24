import Driver from "../database/models/Driver";
import { calculateDistance } from "../helpers/calculateDistance";
export default class DriverController {
  static async getAllDrivers(req, res) {
    const { rows } = await Driver.getAll();
    return res.status(200).json(rows);
  }
  static async getAvailableDrivers(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    return res.status(200).json(rows);
  }
  static async getAvailableDriversWithInRange(req, res) {
    const { rows } = await Driver.getAvailableDrivers();
    const { myLocation, range } = req.query;
    if (!myLocation) {
      return res
        .status(400)
        .json({ message: "myLocation is a query parameter field" });
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
      ).toFixed(1);
      if (distance <= (range | 3)) {
        driversWithInRange.push({ driver, driverRange: `${distance} KM` });
      }
    });
    return res.status(200).json(driversWithInRange);
  }
}
