import app from "./app"
import config from "./config/config"
import { initDB } from "./db/init_db";


const port = config.port;

const main = async ()=>{
    await initDB();

    app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
})
}
main()