import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/config";
import { pool } from "../db/init_db";
import type { ROLES } from "../types";

const auth = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log("This is protected Route");
            // console.log(req.headers.authorization);
            const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized Access !!!"
                })
            }

            const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload
            const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [decoded.email])

            const user = userData.rows[0]
            if (userData.rows.length === 0) {
                res.status(401).json({
                    success: false,
                    message: "User Not Found !!!"
                })
            }
            if (!user.is_active) {
                res.status(403).json({
                    success: false,
                    message: "Forbidden !!!"
                })
            }
            if (roles.length && !roles.includes(user.role)) {
                res.status(401).json({
                    success: false,
                    message: "Forbidden !!!"
                })
            }

            req.user = decoded;

            next()
        } catch (error) {
            next(error)

        }
    }
}

export default auth;