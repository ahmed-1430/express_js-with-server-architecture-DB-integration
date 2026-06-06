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







app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result =
            pool.query(`
            DELETE FROM users
            WHERE id=$1
            `, [id])
        if ((await result).rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'User Not Found!!!',
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: 'user deleted successfully!!!',
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })

    }
})

export default app;