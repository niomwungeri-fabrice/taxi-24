import db from "../index";
export default class Trip {
  static async create(data) {
    const queryString = `INSERT INTO trips
            (departure, destination, is_complete, rider_id, driver_id)
            VALUES
            ($1, $2, false, $3, $4) RETURNING *`;
    return await db.query(queryString, Object.values(data));
  }
  static async getAllActive() {
    const queryString = "SELECT * FROM trips WHERE is_complete=true";
    return await db.query(queryString);
  }
  static async updateTrip(id) {
    const queryString =
      "UPDATE trips SET is_complete=true WHERE id=$1 RETURNING *";
    return await db.query(queryString, [id]);
  }
  static async findByOne(id) {
    const queryString = "SELECT * FROM trips WHERE id = $1";
    return await db.query(queryString, [id]);
  }
}
