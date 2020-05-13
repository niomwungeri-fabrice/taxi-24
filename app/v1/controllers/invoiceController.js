import Invoice from "../database/queries/Invoice";
import constants from "../helpers/constants";
const { OK } = constants.statusCode;
export default class InvoiceController {
  static async getAllInvoices(req, res) {
    const { rows } = await Invoice.getAll();
    return rows.length < 1
      ? res.status(NOT_FOUND).json({
          message: "No invoices found!",
        })
      : res.status(OK).json(rows);
  }
}
