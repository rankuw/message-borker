import {Schema, model} from "mongoose"
import md5 from "md5";

export interface userInterface{
    username: String,
    password: String,
}

const userSchema: Schema = new Schema<userInterface>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function(next: any){
    if(this.isModified("password")){
        this.password = md5(String(this.password));
    }
    next();
})

export default model<userInterface>("User", userSchema);