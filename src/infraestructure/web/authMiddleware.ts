import {Request, Response, NextFunction } from "express";
import { AuthApplication } from "../../application/AuthApplication";

export function authenticateToken(request:Request, response:Response, next:NextFunction):void {

    const authHeader =request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        response.status(401).json({message:"Token Requerido"});
        return;
    }
    try{
        const payload = AuthApplication.verifyToken(token);
        (request as any).user = payload;
        next();
    }catch(error){
        response.status(403).json({message:"Token Invalido o expiracion"});
        return

    }
}

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) return res.status(401).json({ message: "Token requerido" });

      const token = authHeader.split(" ")[1];
      const payload: any = AuthApplication.verifyToken(token);

      // Verificamos que el rol del token esté dentro de los permitidos
      if (!roles.includes(payload.role)) {
        return res.status(403).json({ message: "Acceso denegado: rol no autorizado" });
      }

      (req as any).user = payload; // guardamos el usuario en la request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  };
};
