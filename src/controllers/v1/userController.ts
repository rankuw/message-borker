import { Request, Response, NextFunction } from "express";
import User,{ userInterface} from "../../models/v1/userModel";
import {HydratedDocument} from "mongoose"
import jwt from "jsonwebtoken";
import md5 from "md5";

/**
     * 
     * @param username username to save as payload.
     * @returns String or number 
     */
 function getToken(username: String): String|Number{
    if(process.env.JWT_KEY){
        return jwt.sign({username}, process.env.JWT_KEY, {expiresIn: 60 * 60});
    }
    else{
        return 0
    }
}
/**
 * !this class will contain router static methods
 */
export default class UserMethods{
    
    /**
     * 
     * @param req The request from user.
     * @param res The response to user.
     */
    static async signUp(req: Request, res: Response): Promise<void>{
        const {username, password}: userInterface = req.body;
        
        try{
            if(!username|| !password){
                throw new Error("Enter all credentials");
            }
            const user: userInterface = await User.create({username, password});
            const token: String|Number = getToken(user.username);
            if(token){
                res.cookie('jwt', token)
            }
            res.status(201).send(`User created with user name: ${user.username}`);
        }catch(err: any){
            res.send(err.message);
        }
    }

    /**
     * 
     * @param req The request from user.
     * @param res The response to user.
     */
    static async login(req: Request, res: Response){
        const {username, password} = req.body;
        try{
            if(!username || !password){
                throw new Error("Enter your credentials");
            }else{
                const user: userInterface|null = await User.findOne({username, password: md5(String(password))});
                if(user){
                    const token: String|Number = getToken(username);
                    if(token){
                        res.cookie('jwt', token);
                    }
                    res.status(200).send(`Logged in as ${user.username}`);
                }else{
                    res.status(400).send("Incorrect password or username");
                }
            }
        }catch(err: any){
            res.send(err.message);
        }
    }

    
}