import { connection } from "../dbStrategy/database.js";

export default async function emailCheck(value){
    const {rows: alreadyExist} = await connection.query(`
    SELECT * FROM users WHERE email=$1
    `,[value]);
    
    if(alreadyExist.length>0){
        return true;
    }
    return false;
}