import db from "../index";
export default class Rider {
  static async getAll() {
    const queryString = "SELECT * FROM riders";
    return await db.query(queryString);
  }
  static async findByOne(id) {
    const queryString = "SELECT * FROM riders WHERE id = $1";
    return await db.query(queryString, [id]);
  }
}
