import bcrypt from "bcryptjs"
import type { Iauth } from "./auth.interface"
import { pool } from "../../db/init_db"
import jwt from "jsonwebtoken"
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
    const secretKey = config.secret
    const accessToken = jwt.sign(jwtPayload, secretKey as string, { expiresIn: "1d" })
    return { accessToken };

}

export const authService = {
    loginUserIntoDB
}