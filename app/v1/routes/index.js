import { Router } from "express";
import riderRoutes from "./riderRoutes";
import driverRoutes from "./driverRoutes";
import tripRoutes from "./tripRoutes";
import invoiceRoutes from "./invoiceRoutes";
const router = Router();

router.use(riderRoutes);
router.use(driverRoutes);
router.use(tripRoutes);
router.use(invoiceRoutes);

export default router;
