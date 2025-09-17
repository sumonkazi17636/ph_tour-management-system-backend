/* eslint-disable no-console */
import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';


let server:Server;



const startServer = async()=>{
     try {
        await mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.nmxrj.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to the DB!!");
        server = app.listen(envVars.PORT,()=>{
            console.log(`Server is listening Port ${envVars.PORT}`);
        })
     } catch (error) {
        console.log(error);
     }
}

startServer()

process.on("SIGTERM",()=>{
    console.log("SIGTERM Signal received....server is shutting down....");
    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit(1)
})


process.on("SIGINT",()=>{
    console.log("SIGINT Signal received....server is shutting down....");
    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit(1)
})


process.on("unhandledRejection",(error)=>{
    console.log("unhandled rejection detected....server is shutting down....",error);
    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit(1)
})
process.on("uncaughtException",(error)=>{
    console.log("uncaught exception detected....server is shutting down....",error);
    if(server){
        server.close(()=>{
             process.exit(1)
        })
       
    }
    process.exit(1)
})

//unhandle rejection error
//Promise.reject(new Error("I forgot to catch the promise"))

//uncaught exception error
//throw new Error("i forgot to handle this local error")

