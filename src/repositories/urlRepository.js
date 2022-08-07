import { connection } from "../dbStrategy/database.js";

async function newShortUrl(url,shortUrl,userId){
    try{connection.query(`
        INSERT INTO urls (url,"shortUrl","creatorId") VALUES ($1,$2,$3)
        `,[url,shortUrl,userId])
        return true;
    }catch(error){
        console.log(error.message)
        return false;
    }
}

export const urlRepository = {
    newShortUrl
}