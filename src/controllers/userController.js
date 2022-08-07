import { userRepository } from "../repositories/userRepository.js";
import emailCheck from "../repositories/emailCheck.js";

export async function signUpUser(req,res){
    try{
        const {name,email,password,confirmPassword} = req.body
        const alreadyExists= await emailCheck(email);
        if(alreadyExists){
            return res.sendStatus(409);
        }
        await userRepository.signUp(name,email,password)
        res.sendStatus(201)
    } catch(error)
    {
        console.log(error.message);
        res.sendStatus(500);
    }
}
