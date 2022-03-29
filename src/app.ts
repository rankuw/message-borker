import express, {Application, json} from "express";
import cookies from "cookie-parser";
import dotenv from "dotenv/config";

import connection from "./config/db";
import router from "./routes/v1/authRoutes"

dotenv;
connection();
const app: Application = express();
const PORT = process.env.PORT ?? 5000;

//middleware
app.use(cookies());
app.use(json());
app.use(router);

app.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})
