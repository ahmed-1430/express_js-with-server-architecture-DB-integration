import express, { type Application, type Request, type Response } from "express"
import dotenv from "dotenv";
import { pool } from "./db/init_db";
import { userRoute } from "./modules/user/user.route";
const app: Application = express()

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Express Server",
        "author": "Ahmed"
    })
})

app.use('/api/users', userRoute)









export default app;