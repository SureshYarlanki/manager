//server creation

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
import contactRouter from "./router/contactRouter";
import groupRouter from "./router/groupRouter";
import mongoose from "mongoose";

const app: Application = express();

/**
 * configure express to receive the form data
 */
app.use(express.json())

/**
 * configure dot-env file
 */
dotenv.config({
    path:'./.env'
})
const port:number|string = process.env.PORT||9999
const dbUrl:string | undefined = process.env.MONGO_DB_CLOUD_URL
const dbName:string | undefined = process.env.MONGO_DB_DATABASE

app.get("/", (request:Request, response:Response )=> {
    response.status(200);
    response.json({
        msg:"Welcome to Express Js"
    })
})

//configure the routers
app.use("/contacts", contactRouter)
app.use("/groups", groupRouter)


if (dbUrl) {
mongoose.connect(dbUrl).then(() => {
    console.log("Connected to MongoDB successfully")
}).catch(() => {
    console.log("MongoDB connection failed")
})
}

if (port) {
    app.listen(port, () => {
        console.log(`Express server is started at http://${port}`)
       
    })
}
