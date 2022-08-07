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