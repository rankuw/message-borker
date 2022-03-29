
import { connect, Mongoose } from  "mongoose";

export default async function connection(): Promise<void>{
    try{
        if(process.env.MONGO_URL){
            const result: Mongoose  = await connect(process.env.MONGO_URL);
            console.log("Mongoose running on port", result.connections[0].port);
        }
        else{
            throw new Error("Could not find the mongodb server...");
        }  
    }catch(err: any){
        console.log(err.message);
        process.exit();
    }
}