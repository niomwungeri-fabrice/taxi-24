import db from "../index";
export default class Driver {
  static async getAll() {
    const queryString = "SELECT * FROM drivers";
    return await db.query(queryString);
  }
  static async getAvailableDrivers() {
    const queryString = "SELECT * FROM drivers WHERE is_available=true";
    return await db.query(queryString);
  }
  static async findByOne(id) {
    const queryString = "SELECT * FROM drivers WHERE id = $1";
    return await db.query(queryString, [id]);
  }

  static async updateDriver(is_available, id) {
    const queryString =
      "UPDATE drivers SET is_available=$1 WHERE id=$2 RETURNING *";
    return await db.query(queryString, [is_available, id]);
  }
}
