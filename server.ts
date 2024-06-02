//server creation

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv"
import { DBUtil } from "./util/DBUtil"; 
import contactRouter from "./router/contactRouter";
import groupRouter from "./router/groupRouter";

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
const dbUrl:string | undefined =process.env.MONGO_DB_CLOUD_URL  
const dbName:string | undefined =process.env.MONGO_DB_DATABASE  

app.get("/", (request:Request, response:Response )=> {
    response.status(200);
    response.json({
        msg:"Welcome to Express Js"
    })
})

//configure the routers
app.use("/contacts", contactRouter)
app.use("/groups", groupRouter)


if (port) {
    app.listen(Number(port),  () => {
        
            (async () => {
                try {
                    if (dbUrl && dbName) {
                        const result = await DBUtil.connectToDB(dbUrl, dbName);
                    console.log(result); // Output: Connected to MongoDB successfully
                    }
                    else {
                        console.log("connection failed in port")
                    }
                    
                } catch (error) {
                    console.error(error); // Output: MongoDB connection failed: [Detailed Error Message]
                }
            })();
        console.log(`Express server is started at http://${port}`)
       
    })
}
 