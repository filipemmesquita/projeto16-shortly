import { connection } from "../dbStrategy/database.js";
import joi from "joi";


export default async function validateSignUp(req, res, next) {
    
    const userSchema=joi.object({
        name: joi.string().min(2).required().messages({
        'string.base':`"Nome" precisa ser um tipo de texto`,
        'string.empty':`"Nome" não pode estar vazio`,
        'string.min':`"Nome" deve conter no mínimo 2 caracteres`,
        'string.required':`"Nome" é um campo obrigatório`}),
        email:joi.string().pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).required().messages({
        'string.base':`"E-Mail" precisa ser um tipo de texto`,
        'string.pattern.base':`"E-Mail" precisa ser um e-mail válido`,
        'string.required':`"E-Mail" é um campo obrigatório`}),
        password:joi.string().min(8).required().messages({
        'string.base':`"Senha" precisa ser um tipo de texto`,
        'string.empty':`"Senha" não pode estar vazio`,
        'string.min':`"Senha" deve conter no mínimo 8 caracteres`,
        'string.required':`"Senha" é um campo obrigatório`}),
        confirmPassword:joi.string().min(8).required().messages({
        'string.base':`"Confirmar Senha" precisa ser um tipo de texto`,
        'string.empty':`"Confirmar Senha" não pode estar vazio`,
        'string.min':`"Confirmar Senha" deve conter no mínimo 8 caracteres`,
        'string.required':`"Confirmar Senha" é um campo obrigatório`}),
     });
    const {name,email,password,confirmPassword}=req.body;
  

    if(password!==confirmPassword){
      return res.sendStatus(422);
    }
    const validate=userSchema.validate({name: name, email: email, password:password,confirmPassword:confirmPassword}, {abortEarly:false});
    console.log(validate);
    if(validate.error){
    return res.status(422).send(validate.error.details)
    }
    
    next();
}
  
  