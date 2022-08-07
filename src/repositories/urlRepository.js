import { connection } from "../dbStrategy/database.js";

async function newShortUrl(url,shortUrl,userId){
    try{connection.query(`
        INSERT INTO urls (url,"shortUrl","creatorId") VALUES ($1,$2,$3)
        `,[url,shortUrl,userId]);
        return true;
    }catch(error){
        console.log(error.message);
        return false;
    }
}
async function openUrl(shortUrl){
    const {rows:url}=await connection.query(`
    SELECT url,"visitCount" FROM urls WHERE "shortUrl"=$1
    `,[shortUrl]);
    return url[0];
}
async function updateCount(shortUrl,currentCount){
    const newCount=currentCount+1;
    console.log(newCount)
    connection.query(`
    UPDATE urls SET "visitCount" = $2 WHERE "shortUrl"=$1
    `,[shortUrl,Number(newCount)]);
}
export const urlRepository = {
    newShortUrl,
    openUrl,
    updateCount
}