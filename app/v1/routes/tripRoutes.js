import { Router } from "express";
import TripController from "../controllers/tripController";
import errorHandler from "../middlewares/errorHandler";

const trip = Router();

trip.post("/trips", errorHandler(TripController.createTrip));
trip.get('/trips', errorHandler(TripController.getActiveTrips));
export default trip;
