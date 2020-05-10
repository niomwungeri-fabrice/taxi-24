import db from "../index";
export default class Trip {
  static async create(data) {
    const queryString = `INSERT INTO trips
            (departure, destination, cost_amount, coordinates, is_complete, rider_id, driver_id)
            VALUES
            ($1, $2, $3, $4, false, $5, $6)`;
    return await db.query(queryString, Object.values(data));
  }
  static async getAllActive() {
    const queryString = "SELECT * FROM trips WHERE is_complete=true";
    return await db.query(queryString);
  }
}
