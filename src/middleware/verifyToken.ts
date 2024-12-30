import { Request, Response } from "express";
import httpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";

export async function verifyToken(req:Request,res:Response,next:any){
     let token:any = req.headers['authorization']?.split(" ")[1];
     let secretKey:any = process.env.JWT_SECRET_KEY

     if(!token){
        res.status(httpStatusCodes.UNAUTHORIZED).json({
            message:"Invalid token"
        })
     }

     jwt.verify(token,secretKey,(err:any,data:any)=>{
      if(err){
        res.status(httpStatusCodes.UNAUTHORIZED).json({
            message:err.message
        })
      }else{
        req.user = data,
        next()
      }
     })
}