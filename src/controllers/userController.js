import { userRepository } from "../repositories/userRepository.js";
import emailCheck from "../repositories/emailCheck.js";
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';


export async function signUpUser(req,res){
    try{
        const {name,email,password} = req.body
        const alreadyExists= await emailCheck(email);
        if(alreadyExists){
            return res.sendStatus(409);
        }
        const passwordHash = bcrypt.hashSync(password,10)
        await userRepository.signUp(name,email,passwordHash)
        res.sendStatus(201)
    } catch(error)
    {
        console.log(error.message);
        res.sendStatus(500);
    }
}
export async function signInUser(req,res){
    try{
        const {email,password} = req.body;
        const {rows: user} = await userRepository.signIn(email);
        const comparePassword = bcrypt.compareSync(password, user[0].password);
        if(user && comparePassword){
            const token=uuid();
            await userRepository.newSession(token,user[0].id);
            return res.status(200).send(token);
        };
        res.sendStatus(401);
        

    }catch(error)
    {
        console.log(error.message);
        res.sendStatus(500);
    }
}
