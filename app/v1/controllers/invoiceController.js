import Invoice from "../database/queries/Invoice";
import constants from "../helpers/constants";
const { OK } = constants.statusCode;
export default class InvoiceController {
  static async getAllInvoices(req, res) {
    const { rows } = await Invoice.getAll();
    return res.status(OK).json(rows);
  }
}
