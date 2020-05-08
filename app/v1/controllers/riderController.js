import Rider from "../database/models/Rider";

export default class RiderControllers {
  static async getAllRiders(req, res) {
    const { rows } = await Rider.getAll();
    return res.status(200).json(rows);
  }
}
