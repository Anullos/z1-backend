import { Router } from "express";
import { signup } from "../../../controllers/api/v1/auth-controllers";

const router: Router = Router();

router.post("/signup", signup);

export default router;
