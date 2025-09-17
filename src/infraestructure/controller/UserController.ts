import { UserApplicationService } from "../../application/UserApplicationService";
import {Request, Response} from 'express';
import { User } from "../../domain/User/User";
 
export class UserController{
    private app: UserApplicationService;
   
    constructor(app:UserApplicationService){
        this.app = app;
    }

    async login(req: Request, res: Response): Promise<string | Response>{
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
 
      // Validación de email
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });
 
      // Validación de contraseña
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });
 
      const token = await this.app.login(email, password);
      return res.status(200).json({ token });
     
    } catch (error) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    } 
 
    async registerUser(request:Request, response: Response):Promise<Response>{
        const{name,email,password}= request.body;
        try {
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if(!nameRegex.test(name.trim())) return response.status(400).json({message:"error en el dato/nombre"});
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return response.status(400).json({ error: "Correo electrónico no válido" });
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return response.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });

    const status = 1;
    const user: Omit<User,"id"> = {name, email, password, status};
    const userId= await this.app.createUser(user);
    return response
        .status(201).json({message:"usuario registrado correctamente", userId });
        } catch (error) {
            return response.status(500).json({message:" Error en el servidor interno"});
        }
    }
 
    async getAllUsers(request: Request, response:Response):Promise<Response>{
        try {
            const users = await this.app.getAllUsers();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({message:" Error en el servidor"})
        }
    }
 
    async getUserById(request: Request, response: Response): Promise<Response> {
        try{
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400)
                .json({ message: "ID inválido" });
            }
 
            const user = await this.app.getUserById(id);
            if (!user) {
                return response.status(404)
                .json({ message: "Usuario no encontrado" });
            }
            return response.status(200).json(user);
 
        }catch (error) {
            return response.status(500).json({ message: "Error en el servidor" });
        }  
    }

    async updateUser(request: Request, response: Response): Promise<Response> {
        try{
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400)
                .json({ message: "ID inválido" });
            }
 
            let {name, email, password, status} = request.body;
            if(name && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(name.trim())) {
                return response.
                status(400).
                json({message:"error en el dato/nombre"});
            }
            if(email && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                return response
                .status(400)
                .json({ error: "Correo electrónico no válido" });
            }
            if(password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password.trim())) {
                return response.status(400).json({
                    message: "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
                });
            }
            status = 1;
 
            const updated = await this.app.updateUser(id, {name, email, password, status});
            if (!updated) {
                return response.status(200).json({message: "Error al encontrar el usuario"});
            }
            return response.status(200).json({message: "Usuario actualizado correctamente"});
 
        }catch (error){
            return response.status(500).json({message: "Error en el servidor"});
        }
 
    }    
 
    //yarea terminar la consulta por email y el dado de baja: delete

    async getUserByEmail(request: Request, response: Response): Promise<Response> {
    const email = request.params.email;


    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        return response.status(400).json({ message: "Correo electrónico no válido" });
    }

    try {
        const user = await this.app.getUserByEmail(email);

        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }

        return response.status(200).json(user);

    } catch (error) {
        console.error("Error en getUserByEmail:", error);
        return response.status(500).json({ message: "Error en el servidor" });
    }
}



    async deleteUserById(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: "ID inválido" });
            }

            const deleted = await this.app.deleteUserById(id); 
            if (!deleted) {
                return response.status(404).json({ message: "Usuario no encontrado" });
            }
            return response.status(200).json({ message: "Usuario dado de baja correctamente" });

        } catch (error) {
            return response.status(500).json({ message: "Error en el servidor" });
        }
    }

 
}
 