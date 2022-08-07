import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function validateSignIn(req, res, next) {
    
    const userSchema=joi.object({
        email:joi.string().pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required().messages({
        'string.base':`"E-Mail" precisa ser um tipo de texto`,
        'string.pattern.base':`"E-Mail" precisa ser um e-mail válido`,
        'string.required':`"E-Mail" é um campo obrigatório`}),
        password:joi.string().min(8).required().messages({
        'string.base':`"Senha" precisa ser um tipo de texto`,
        'string.empty':`"Senha" não pode estar vazio`,
        'string.min':`"Senha" deve conter no mínimo 8 caracteres`,
        'string.required':`"Senha" é um campo obrigatório`}),
     });
    const {email,password}=req.body;
    const validate=userSchema.validate({email:email,password:password}, {abortEarly:false});
    if(validate.error){
    return res.status(422).send(validate.error.details)
    }
    next();
}
  
  