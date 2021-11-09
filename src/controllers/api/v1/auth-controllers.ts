import { Request, Response } from "express";
import { UserEntity } from '../../../entities/user_entity';
import { encryptPassword, comparePassword } from '../../../lib/tools/password';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, confirm_password, role } = req.body;

    // check if email is valid
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.status(400).json({
            success: false,
            message: "You have entered an invalid email address!",
        });
    }
    // check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password do not match",
        });
    }
    // check if password is at least 6 characters
    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long",
        });
    }
    // check if role is Profesor or Estudiante
    if (role !== "Profesor" && role !== "Estudiante") {
        return res.status(400).json({
            success: false,
            message: "Role must be Profesor or Estudiante",
        });
    }
    // check if user already exists
    const user = await UserEntity.findOne({ email });
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    // hash password
    const password_hash = await encryptPassword(password);
    try {
        // create user
        const now = new Date();
        const insert = await UserEntity.insert(
            {
                name: name,
                email: email,
                password: password_hash,
                role: role,
                created_at: now,
                updated_at: now,
            }
        );
        const newUser = await UserEntity.findOne({ id: insert.raw.insertId });
        // create token
        // const expireIn = 60 * 60 * 24 * 7; // 7 days

        // const token: string = jwt.sign(
        //     {
        //         _id: newUser.raw.insertId,
        //         role: role,
        //     },
        //     process.env.JWT_SECRET || "",
        //     { expiresIn: expireIn }
        // );

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser,
            //token: token,
            //expiresIn: expireIn,
            user_id: newUser?.id,
            role: newUser?.role,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }

};

