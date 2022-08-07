import { authRepository } from "../repositories/authRepository.js";

export default async function authenticateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const session = await authRepository.authenticateSession(token);
    if(!session){
        return res.sendStatus(401);
    }
    res.locals.userId = session.userId;
    next();
}