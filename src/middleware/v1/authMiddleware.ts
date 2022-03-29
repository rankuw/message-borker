import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default async function auth(req: Request, res: Response, next: NextFunction): Promise<void>{
    const token: string|undefined = req.cookies.jwt
    if(token && process.env.JWT_KEY){
        try{
            const username = jwt.verify(token, process.env.JWT_KEY );
            req.body.client = username;
            next();
        }catch(err){
            res.status(403).send("Login first");
        }
    }else{
        res.status(403).send("Login first");
    }
}