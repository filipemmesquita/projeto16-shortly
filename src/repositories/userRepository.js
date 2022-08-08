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
async function getUser(userId){
    const {rows:user} = await connection.query(`
SELECT 
	users.id, 
	users.name, 
	urls.id AS "urlId", 
	urls."shortUrl", 
	urls.url, 
	urls."visitCount",
	(SELECT 
	 	SUM(urls."visitCount")
    FROM 
		users 
	 	JOIN urls ON users.id="creatorId" 
	WHERE 
	 	users.id=$1
    GROUP BY 
	 	users.id
	) AS "totalCount"
FROM 
    users 
    JOIN urls ON users.id = urls."creatorId"
WHERE 
    users.id=$1;
    `,[userId]);
    const userObject={
        id:user[0].id,
        name:user[0].name,
        visitCount:user[0].totalCount,
        shortenedUrls:user.map((entry)=>{
            return{
                id:entry.urlId,
                shortUrl:entry.shortUrl,
                url:entry.url,
                visitCount:entry.visitCount
            };
        })
    };
    return(userObject)
}

export const userRepository = {
	signUp,
    signIn,
    newSession,
    getUser
}