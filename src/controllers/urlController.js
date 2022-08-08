import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/urlRepository.js";

export async function shortenURL(req,res){
    const {url}=req.body;
    const shortUrl=nanoid();
    const insert = await urlRepository.newShortUrl(url,shortUrl,res.locals.userId);
    return res.status(201).send({shortUrl});
}
export async function openUrl(req,res){
    const shortUrl= req.params.shortUrl;
    const url= await urlRepository.openUrl(shortUrl);
    if(url){
        urlRepository.updateCount(shortUrl,Number(url.visitCount));
        return res.redirect(url.url);
    }
    return res.sendStatus(404);
}
export async function getUrl(req,res){
    const urlId=req.params.id;
    const urlEntry = await urlRepository.getUrl(urlId);
    if(urlEntry){
        delete urlEntry.creatorId;
        return res.status(200).send(urlEntry);
    }
    return res.sendStatus(404);
}
export async function deleteUrl(req,res){
    const urlId=req.params.id;
    const userId=res.locals.userId;
    const urlEntry=await urlRepository.getUrl(urlId);
    if(!urlEntry){
        return res.sendStatus(404);
    }
    if(urlEntry.creatorId!==userId){
        return res.sendStatus(401);
    }
    await urlRepository.deleteUrl(urlId);
    return res.sendStatus(204)
}