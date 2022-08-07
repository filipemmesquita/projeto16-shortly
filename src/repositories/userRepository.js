import { connection } from "../dbStrategy/database.js";

async function signUp(name,email,password) {
	return connection.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
    `,[name,email,password]);
}

export const userRepository = {
	signUp
}