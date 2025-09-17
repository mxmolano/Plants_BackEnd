import { Repository } from "typeorm";
import { User } from "../../domain/User/User";
import { User as UserDomain } from "../../domain/User/User";
import { UserPort } from "../../domain/User/UserPort";
import { UserEntity } from "../entities/user/UserEntity";
import { AppDataSource } from "../config/data-base";

export class UserAdapter implements UserPort{

    private userRepository: Repository<UserEntity>

    constructor(){
        this.userRepository =AppDataSource.getRepository(UserEntity);
    }
     private toDomain(user:UserEntity): UserDomain{
        return{
            id:user.id_user,
            name:user.name_user,
            email:user.email_user,
            password:user.password_user,
            status:user.status_user
        }    
     }

     private toEntity(user:Omit<UserDomain,"id">):  UserEntity{
        const userEntity=new UserEntity();
        userEntity.name_user =user.name;
        userEntity.email_user = user.email;
        userEntity.password_user=user.password;
        userEntity.status_user = user.status;
        return userEntity;

     }

    async createUser(user: Omit<User, "id">): Promise<number> {
        try{
            const newUser = this.toEntity(user);
            const saveUser= await this.userRepository.save(newUser);
            return saveUser.id_user;
        }catch(error){
            console.error("Error creating user:", error);
            throw new Error("Error creating user");

        }
    }
    
    async updateUser(id: number, user: Partial<User>): Promise<boolean> {
        try{
            const existingUser =await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){
                throw new Error ("User not found");
            }
            //actualizamos las propiedades
            Object.assign(existingUser,{
                name_user:user.name ?? existingUser,
                email_user:user.email ?? existingUser,
                password_user:user.password ?? existingUser,
                status_user:1
            });
            await this.userRepository.save(existingUser);
            return true;
        }catch(error){
             console.error("Error updateing user:", error);
            throw new Error("Error updateing user");              
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try{
            const existingUser = await this.userRepository.findOne({where:{id_user:id}});
            if(!existingUser){
                throw new Error ("User not found");
            }
            Object.assign(existingUser,{
                status_user:0
            });
            await this.userRepository.save(existingUser);
            return true;
        }catch(error){
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");  
        }
    }
    async getUserById(id: number): Promise<User | null> {
        try{
            const user =await this.userRepository.findOne({where:{id_user:id}});
            return user ? this.toDomain(user):null;
        }catch(error){
            console.error("Error fetching user by id:", error);
            throw new Error("Error fetching user by id");        
        }
    }
    async getUserByEmail (email:string): Promise <User |null> {
        try{
            const user =await this.userRepository.findOne({where:{email_user:email}});
            return user ? this.toDomain(user):null;
        }catch(error){
            console.error("Error fetching user by email:", error);
            throw new Error("Error fetching user by email");        
        }
    }

    async getAllUsers(): Promise<User[]> {
        try{
            const user =await this.userRepository.find();
            return user.map (this.toDomain);
        }catch(error){
            console.error("Error fetching all user :", error);
            throw new Error("Error fetching alll user ");        
        }
    }

} 