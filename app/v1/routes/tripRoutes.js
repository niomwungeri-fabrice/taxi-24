import { Router } from "express";
import TripController from "../controllers/tripController";
import errorHandler from "../middlewares/errorHandler";
import ModelValidator from "../middlewares/modelValidator";

const trip = Router();

trip.put(
  "/trips/:tripId/complete",
  ModelValidator.validateTrip,
  errorHandler(TripController.completeTrip)
);
trip.post(
  "/trips",
  ModelValidator.validateRider,
  ModelValidator.validateDriver,
  errorHandler(TripController.createTrip)
);
trip.get("/trips", errorHandler(TripController.getActiveTrips));

export default trip;
