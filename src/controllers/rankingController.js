import { rankingRepository } from "../repositories/rankingRepository.js";

export async function rankUsers(req,res){
    const ranking=await rankingRepository.rankUsers();
    res.status(200).send(ranking);
}