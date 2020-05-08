import { Router } from "express";
import riderRouters from "./riderRoutes";

const router = Router();

router.use(riderRouters);

export default router;
