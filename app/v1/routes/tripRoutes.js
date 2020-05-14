import { Router } from "express";
import TripController from "../controllers/tripController";
import errorHandler from "../middlewares/errorHandler";
import ModelValidator from "../middlewares/modelValidator";
import {
  validateTrip,
  validateId,
  validateGPS,
} from "../middlewares/validators";
const trip = Router();

trip.put(
  "/trips/:id/complete",
  validateId,
  ModelValidator.validateTrip,
  errorHandler(TripController.completeTrip)
);
trip.post(
  "/trips",
  validateTrip,
  validateGPS,
  ModelValidator.validateRider,
  ModelValidator.validateDriver,
  errorHandler(TripController.createTrip)
);
trip.get("/trips", errorHandler(TripController.getActiveTrips));

export default trip;
