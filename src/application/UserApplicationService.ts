import {UserPort} from "../domain/User/UserPort"
import {User} from "../domain/User/User"
import { AuthApplication } from "./AuthApplication";
import bcrypt from "bcryptjs"


export class UserApplicationService {
    private port!: UserPort;
    constructor(port: UserPort){
        this.port = port;
    }

    async login(email: string, password: string): Promise<string> {
        const existingUser = await this.port.getUserByEmail(email);
        if (!existingUser) {
            throw new Error("Credentials are Invalid");
        }
        const passwordMath = await bcrypt.compare(password, existingUser.password);
        if (!passwordMath) {
            throw new Error("Credentials are Invalid");
        }
        const token = AuthApplication.generateToken({
            id: existingUser.id,
            email: existingUser.email
        });
 
        return token;
    }


    async createUser (user: Omit<User,"id">):Promise<number>{
        //aqui las validaciones necesarias para la logica de negocios
        const existingUser = await this.port.getUserByEmail(user.email);
        if (!existingUser){
            const hashedPassword = await bcrypt.hash(user.password,10);
            user.password= hashedPassword;
            return this.port.createUser(user);
        }
        throw new Error("El usuario ya existe");
    }

    async updateUser(id:number,user:Partial<User>):Promise<boolean>{
        const existingUser =await this.port.getUserById(id);
        if(!existingUser){
            throw new Error("User nof found");
        }
        if(user.email){
            const emailTaken = await this.port.getUserByEmail(user.email);
            if(emailTaken && emailTaken.id !== id){
                throw new Error ("Email already taken");
            }
        }
        return await this.port.updateUser(id,user);
    }

    async deleteUserById(id:number):Promise<boolean>{
        const existingUser =await this.port.getUserById(id);
        if(!existingUser){
            throw new Error("User nof found");
        }
        return await this.port.deleteUser(id);
    }

    async getUserById(id:number):Promise<User | null>{
        return await this.port.getUserById(id);
    }
    async getUserByEmail(email:string):Promise<User|null>{
        return await this.port.getUserByEmail(email);
    }
    async getAllUsers():Promise<User[]>{
        return await this.port.getAllUsers();
    }


}