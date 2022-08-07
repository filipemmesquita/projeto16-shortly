import { userRepository } from "../repositories/userRepository.js";

export async function signUpUser(req,res){
    try{
        const {name,email,password,confirmPassword} = req.body
        await userRepository.signUp(name,email,password)
        res.sendStatus(201)
    } catch(error)
    {
        console.log(error.message);
        res.sendStatus(500);
    }
}
