import jwt from "jsonwebtoken";
const JWR_KEY = "QWERTYUIOPASDFGHJKLÑZXCVBNM1234567890";
export class AuthApplication{
    static generateToken(payload:object):string{
        return jwt.sign(payload,JWR_KEY,{expiresIn:"1h"});
    }
    static verifyToken(token:string):any{
        return jwt.verify(token,JWR_KEY);
    }
}

