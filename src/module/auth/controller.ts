import { Request, Response } from "express";
import * as authServices from "./services";
import httpStatusCodes from "http-status-codes";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function createUser(req:Request,res:Response){
    try {
        const {name,email,password,role} = req.body;
        
       let encryptedPassword = bcrypt.hashSync(password,12);
       let userData = {
             email,
             name,
             password:encryptedPassword,
             role
       }

       await authServices.saveUser(userData)
    let user =  await authServices.getUser(email);

     res.status(httpStatusCodes.CREATED).json({
        data:user,
        message:"user registered successfully"
     })
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message:error
        })
    }
}






export async function findAllUser(req:Request,res:Response){
    try {
    let user =  await authServices.getAllUser();
    console.log(user);
    
     res.status(httpStatusCodes.OK).json({
        data:user,
        message:"user fetched successfully"
     })
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message:error
        })
    }
}



export async function loginUser(req:Request,res:Response){
    try {
        let secretKey:any = process.env.JWT_SECRET_KEY
 
    let user:any =  await authServices.getUser(req.body.email);

    if(!user){
        res.status(httpStatusCodes.NOT_FOUND).json({
            message:"user not registred with us"
        })
    }else{
        let isVerified = bcrypt.compareSync(user?.password,req.body.password)
     if(isVerified){
       
    let token = await jwt.sign({id:user?.id,role:user.role},secretKey,{expiresIn:"1h"});

    res.status(httpStatusCodes.OK).json({
        token,
        data:user,
        message:"logged in succesfully"
    })


     }else{
        res.status(httpStatusCodes.UNAUTHORIZED).json({
            message:"Incorrect password"
        })
     }
    }
         
     res.status(httpStatusCodes.OK).json({
        data:user,
        message:"user fetched successfully"
     })
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message:error
        })
    }
}