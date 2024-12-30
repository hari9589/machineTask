import mysql from "mysql2";


export async function databaseConnect(){
try {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });
  console.log('Db connected')
  return  connection;
} catch (error) {
    console.log(`Error in connectDb :${error}`);
    process.exit()
}

}