import { Router } from "express";
import RiderControllers from "../controllers/riderController";
import errorHandler from "../middlewares/errorHandler";
import {
  validateId,
  validateMyLocation,
  validateGPS,
} from "../middlewares/validators";
const rider = Router();

rider.get(
  "/riders/closest",
  validateMyLocation,
  validateGPS,
  errorHandler(RiderControllers.getClosestDrivers)
);
rider.get(
  "/riders/:id",
  validateId,
  errorHandler(RiderControllers.getRiderById)
);
rider.get("/riders", errorHandler(RiderControllers.getAllRiders));

export default rider;
