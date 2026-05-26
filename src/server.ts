import express, { type Application, type Request, type Response } from "express"
import { env } from "node:process";
import { Pool } from "pg"
const app: Application = express()
const port = 5000

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))
const pool = new Pool({
    connectionString: env.databaseUrl
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Express Server",
        "author": "Ahmed"
    })
})
app.post('/', async (req: Request, res: Response) => {
    // console.log(req.body);
    const body = req.body;
    res.status(201).json({
        message: "created successfully",
        data: body
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
