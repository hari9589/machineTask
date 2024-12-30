import { databaseConnect } from "../../connectDb/connectDb";

let Pool =  databaseConnect();

export async function saveUser(data:any){
    
      (await Pool).execute(`INSERT INTO Users (email, name, password,role)
VALUES ('${data?.email}','${data?.name}','${data?.password}','${data?.role}');`)
}


export async function getUser(data:String){
   return (await Pool).execute(`Select * from Users where email = '${data}'`)
}



export  async function getAllUser(){
(await Pool).query(`select * from users`,(err,data)=>{
    if(err){
        return err
    }
    else{
        return data
    }
})
}


