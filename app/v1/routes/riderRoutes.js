import { Router } from "express";
import RiderControllers from "../controllers/riderController";
import errorHandler from "../middlewares/errorHandler";

const rider = Router();

rider.get("/riders/closest", errorHandler(RiderControllers.getClosestDrivers));
rider.get("/riders/:id", errorHandler(RiderControllers.getRiderById));
rider.get("/riders", errorHandler(RiderControllers.getAllRiders));

export default rider;
