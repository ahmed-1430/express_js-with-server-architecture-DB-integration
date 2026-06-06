import { pool } from "../../db/init_db"
import type { Iuser } from "./user.interface";

const createUserIntoDb = async (payload: Iuser) => {
    const { name, email, password, age } = payload
    const result = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, password, age]);
    return result

}

export const userService = {
    createUserIntoDb
}