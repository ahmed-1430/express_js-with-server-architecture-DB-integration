import type { Request, Response } from "express";
import { pool } from "../../db/init_db";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);
    // const { name, email, password, age } = req.body;

    try {
        const result = await userService.createUserIntoDb(req.body)
        res.status(201).json({
            success: true,
            message: "User created successfully!!",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserFromDb()
        res.status(200).json({
            success: true,
            message: 'users retrieved successfully!!!',
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })

    }
}


const getSingleUser =  async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const result = await userService.getSingleUserFromDB(id as string)
           
            if (result.rows.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'User Not Found!!!',
                    data: {}
                })
                return
            }
            res.status(200).json({
                success: true,
                message: 'users retrieved successfully!!!',
                data: result.rows[0]
            })

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
                error: error
            })
        }
    }

    const updateUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, age, password, is_active } = req.body
    try {
        const result = await userService.updateUserInfoToDB(req.body, id as string)        
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User Not Found!!!',
                data: {}
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: 'user updated successfully!!!',
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUserInfo
}