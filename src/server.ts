import express, { type Application, type Request, type Response } from "express"
import dotenv from "dotenv";
import { Pool } from "pg"
const app: Application = express()
const port = 5000
dotenv.config();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))
const databaseUrl = process.env.DATABASE_URL
const pool = new Pool({
    connectionString: databaseUrl
});

const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY, 
            name VARCHAR(20),
            email VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

        )`);
        console.log('DATABASE Connected Successfully!!');

    } catch (error) {
        console.log(error);

    }
};
initDB();

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
