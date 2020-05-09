import { Router } from "express";
import riderRoutes from "./riderRoutes";
import driverRoutes from "./driverRoutes";
import tripRoutes from "./tripRoutes";

const router = Router();

router.use(riderRoutes);
router.use(driverRoutes);
router.use(tripRoutes);

export default router;
