import Driver from "../database/models/Driver";

export default class DriverController {
  static async getAllDrivers(req, res) {
    const { rows } = await Driver.getAll();
    return res.status(200).json(rows);
  }
}
