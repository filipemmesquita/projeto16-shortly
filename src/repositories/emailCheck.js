import { connection } from "../dbStrategy/database.js";

export default async function emailCheck(value){
    const {rows: alreadyExist} = await connection.query(`
    SELECT * FROM users WHERE email=$1
    `,[value]);
    
    if(alreadyExist.length>0){
        console.log(alreadyExist)
        return true;
    }
    console.log(alreadyExist)
    return false;
}