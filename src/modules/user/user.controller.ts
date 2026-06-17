import type { Request, Response } from "express";
import { pool } from "../../db/init_db";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";


const createUser = async (req: Request, res: Response) => {
    // console.log(req.body);
    // const { name, email, password, age } = req.body;

    try {
        const result = await userService.createUserIntoDb(req.body)
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successfully!!",
            data: result.rows[0]
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getUserFromDb()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'users retrieved successfully!!!',
            data: result.rows
        })

    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}


const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows.length === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User Not Found!!!',
                data: {}
            })
            return
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'users retrieved successfully!!!',
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
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
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User Not Found!!!',
                data: {}
            })
            return;
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'user updated successfully!!!',
            data: result.rows[0]
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }


}

const deleteUserInfo = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await userService.deleteUserFromDB(id as string)
        if ((await result).rowCount === 0) {
            sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'User Not Found!!!',
            })
            return;
        }
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'user deleted successfully!!!',
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
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
    updateUserInfo,
    deleteUserInfo
}