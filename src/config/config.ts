import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

const config = {
    DataBase_Url: process.env.DATABASE_URL as string,
    port: process.env.PORT,
    secret: process.env.SECRET,
    refresh_secret: process.env.REFRESH_SECRET
}
export default config;