import db from "../index";
export default class Driver {
  constructor(id, names, phone, email, location, isAvailable) {
    this.id = id;
    this.names = names;
    this.phone = phone;
    this.email = email;
    this.isAvailable = isAvailable,
    this.location = location
  }
  static async getAll() {
    const queryString = "SELECT * FROM drivers";
    return await db.query(queryString);
  }
  catch(error) {
    return error;
  }
}