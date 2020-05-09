import Rider from "../database/models/Rider";
import constants from "../helpers/constants";
const { OK, NOT_FOUND } = constants.statusCode;
export default class RiderControllers {
  static async getAllRiders(req, res) {
    const { rows } = await Rider.getAll();
    return res.status(OK).json(rows);
  }
  static async getRiderById(req, res) {
    const { id } = req.params;
    const { rows } = await Rider.findByOne(id);
    if (!rows[0]) {
      return res.status(NOT_FOUND).send({ message: "Rider does not exist" });
    }
    return res.status(OK).json(rows[0]);
  }
}
