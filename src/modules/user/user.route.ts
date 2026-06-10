import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_Role } from "../../types";


const router = Router()
router.post('/', userController.createUser)

router.get('/', auth(USER_Role.admin, USER_Role.agent), userController.getUser)

router.get('/:id', userController.getSingleUser)

router.put('/:id', userController.updateUserInfo)

router.delete('/:id', userController.deleteUserInfo)

export const userRoute = router;