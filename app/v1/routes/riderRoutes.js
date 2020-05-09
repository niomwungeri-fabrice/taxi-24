import { Router } from "express";
import RiderControllers from "../controllers/riderController";
import errorHandler from "../middlewares/errorHandler";
const rider = Router();

rider.get("/riders", errorHandler(RiderControllers.getAllRiders));
rider.get(
  "/riders/:id",
  errorHandler(RiderControllers.getRiderById)
);
export default rider;
