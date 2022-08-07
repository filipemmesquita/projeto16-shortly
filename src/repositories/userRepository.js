import { connection } from "../dbStrategy/database.js";

async function signUp(name,email,password) {
	return connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `,[name,email,password]);
}
async function signIn(email){
    return connection.query(`
    SELECT * FROM users WHERE email=$1
    `,[email]);
}
async function newSession(token,userId){
    connection.query(`
    INSERT INTO sessions (token, "userId") VALUES ($1,$2)
    `,[token,userId]);
}

export const userRepository = {
	signUp,
    signIn,
    newSession
}