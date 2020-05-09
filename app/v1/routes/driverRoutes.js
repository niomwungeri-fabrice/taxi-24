import { Router } from "express";
import DriverController from "../controllers/driverController";
import errorHandler from "../middlewares/errorHandler";

const driver = Router();

driver.get("/drivers", errorHandler(DriverController.getAllDrivers));

export default driver;
