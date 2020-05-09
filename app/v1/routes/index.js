import { Router } from "express";
import riderRoutes from "./riderRoutes";
import driverRoutes from "./driverRoutes";

const router = Router();

router.use(riderRoutes);
router.use(driverRoutes);

export default router;
