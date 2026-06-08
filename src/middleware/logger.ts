import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger = (req: Request, res: Response, next: NextFunction) => {
    const log = `Method: ${req.method},  URL: ${req.url}, time: ${Date.now()}`
    
    fs.appendFile("logger.txt", log, (err) => {
        console.log(err);
    })
    next();
};
