import { Router } from "express";
import { userController } from "./user.controller";


const router = Router()
router.post('/', userController.createUser)

router.get('/api/users', )

export const userRoute = router;