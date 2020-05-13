import { Router } from "express";
import InvoiceController from "../controllers/invoiceController";
import errorHandler from "../middlewares/errorHandler";

const invoice = Router();

invoice.get("/invoices", errorHandler(InvoiceController.getAllInvoices));

export default invoice;
