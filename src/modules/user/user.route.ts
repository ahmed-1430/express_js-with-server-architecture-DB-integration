import { Router } from "express";
import { userController } from "./user.controller";


const router = Router()
router.post('/', userController.createUser)

router.get('/', userController.getUser)

router.get('/:id', userController.getSingleUser)

router.put('/:id', userController.updateUserInfo)

router.delete('/:id', userController.deleteUserInfo)

export const userRoute = router;