import { connection } from "../dbStrategy/database.js";

async function authenticateSession(token){
    const {rows: session}=await connection.query(`
    SELECT * FROM sessions WHERE token=$1
    `,[token]);
    return session[0];
}

export const authRepository = {
    authenticateSession
}