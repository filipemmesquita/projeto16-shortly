import { connection } from "../dbStrategy/database.js";

async function rankUsers(){
    const {rows:ranking} = await connection.query(`
        SELECT 
            U.id,
            U.name,
            (SELECT 
                COUNT(urls.id)
            FROM 
                users 
                JOIN urls ON urls."creatorId" = users.id
            WHERE users.id=U.id
            GROUP BY urls."creatorId"
            ) AS "linksCount",
            (SELECT
                SUM(urls."visitCount")
            FROM 
                users
                JOIN urls ON urls."creatorId" = users.id
            WHERE users.id=U.id
            GROUP BY urls."creatorId"
            ) AS "visitCount"
        FROM
            users U
            JOIN urls ON urls."creatorId" = U.id
        GROUP BY U.id
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;
    `);
    console.log(ranking);
    return ranking;
}

export const rankingRepository={
    rankUsers
}