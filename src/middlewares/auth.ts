import { Request, Response, NextFunction } from "express";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id, role } = req.headers; // change for token and use jsonwebtoken.verify
    if (!user_id || !role) {
        return res.status(401).json({
            message: "Access denied. No user provided."
        });
    }
    if (role !== "Profesor" && role !== "Estudiante") {
        return res.status(401).json({
            message: "Access denied. You are not an admin."
        });
    }
    try {
        req.user_id = { userId: user_id };
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid user."
        });
    }
};
