import { Request, Response } from "express";

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email == 'profesor@z1.com' && password == '123') {
        res.json({
            status: 'ok',
            token: '123456'
        })
    } else if (email == 'estudiante@z1.com' && password == '123') {
        res.json({
            status: 'ok',
            token: '654321'
        })
    } else {
        res.status(401).json({
            status: 'error',
            message: 'Usuario o contraseña incorrectos'
        })
    }
};
