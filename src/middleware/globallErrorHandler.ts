import type { NextFunction, Request, Response } from "express";


const globallErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // console.error(err.stack);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}
export default globallErrorHandler;