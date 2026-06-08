import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    DataBase_Url: process.env.DATABASE_URL as string,
    port: process.env.PORT,
    secret: process.env.SECRET
}
export default config;