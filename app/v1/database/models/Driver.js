import db from "../index";
export default class Driver {
  constructor(id, names, phone, email, location, isAvailable) {
    this.id = id;
    this.names = names;
    this.phone = phone;
    this.email = email;
    this.isAvailable = isAvailable;
    this.location = location;
  }
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
}
