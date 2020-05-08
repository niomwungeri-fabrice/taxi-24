import db from "../index";
export default class Rider {
  constructor(id, names, phone, email) {
    this.id = id;
    this.names = names;
    this.phone = phone;
    this.email = email;
  }
  static async getAll() {
    const queryString = "SELECT * FROM riders";
    try {
      return await db.query(queryString);
    } catch (error) {
      return error;
    }
  }
}
