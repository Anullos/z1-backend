import { Router } from "express";

const router: Router = Router();

router.get("/signin", (req, res) => {
    res.render("users/signin");
});

export default router;