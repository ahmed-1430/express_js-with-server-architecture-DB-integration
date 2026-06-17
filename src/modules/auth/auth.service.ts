import bcrypt from "bcryptjs"
import type { Iauth } from "./auth.interface"
import { pool } from "../../db/init_db"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../../config/config"

const loginUserIntoDB = async (payload: Iauth) => {
    const { email, password } = payload
    // check if the user exists
    // compare the password
    // generate token
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1        
        `, [email])
    const user = userData.rows[0]
    console.log(user);
    if (userData.rows.length === 0) {
        throw new Error("Invalid Credentital!!!")
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentital")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role
    }
    const secretKey = config.secret;
    const refresh_secret = config.refresh_secret;
    const accessTokenTime = config.accessTokenTime;
    const refreshTokenTime = config.refreshTokenTime
    const accessToken = jwt.sign(jwtPayload, secretKey as string, { expiresIn: accessTokenTime as any })

    const refreshToken = jwt.sign(jwtPayload, refresh_secret as string, { expiresIn: refreshTokenTime as any })




    return { accessToken, refreshToken };

}

const generateRefreshToken = async (token: string) => {
    if (!token) {
        throw new Error('unauthorized')
    }

    const decoded = jwt.verify(token as string, config.refresh_secret as string) as JwtPayload
    const userData = await pool.query(`
            SELECT * FROM users WHERE email=$1
            `, [decoded.email])

    const user = userData.rows[0]
    if (userData.rows.length === 0) {
        throw new Error('User Not Found')
    }
    if (!user.is_active) {
        throw new Error('Forbidden')
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        role: user.role
    }
    const accessTokenTime = config.accessTokenTime;
    const secretKey = config.secret
    const accessToken = jwt.sign(jwtPayload, secretKey as string, { expiresIn: accessTokenTime as any })

    return { accessToken };
}

export const authService = {
    loginUserIntoDB,
    generateRefreshToken
}