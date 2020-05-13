import { Router } from "express";
import DriverController from "../controllers/driverController";
import errorHandler from "../middlewares/errorHandler";
import { validateMyLocation } from "../middlewares/validators";
const driver = Router();

driver.get("/drivers", errorHandler(DriverController.getAllDrivers));
driver.get(
  "/drivers/available",
  errorHandler(DriverController.getAvailableDrivers)
);
driver.get(
  "/drivers/available/range",
  validateMyLocation,
  errorHandler(DriverController.getAvailableDriversWithInRange)
);
driver.get("/drivers/:id", errorHandler(DriverController.findDriverById));

export default driver;
