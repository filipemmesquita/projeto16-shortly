import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function validateUrl(req, res, next) {
    
    const userSchema=joi.object({
        url:joi.string()
        .pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
        .required()
        .messages({
            'string.base':`"URL" precisa ser um tipo de texto`,
            'string.pattern.base':`"URL" precisa ser uma URL válida`,
            'string.required':`"URL" é um campo obrigatório`}),
     });
    const {url}=req.body;
    const validate=userSchema.validate({url:url}, {abortEarly:false});
    if(validate.error){
    return res.status(422).send(validate.error.details)
    }
    next();
}