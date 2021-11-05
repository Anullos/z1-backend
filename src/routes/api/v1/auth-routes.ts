import { Router } from "express";
import { signin } from "../../../controllers/api/v1/auth-controllers";

const router : Router = Router();

router.post("/signin", signin);

export default router;
