
import { HttpStatus } from "@nestjs/common";
import { RoleEntity } from "src/role/entities/role.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";


@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{

    /* 
        CREATE USER REPOSITORY 
    */
   async createUser(createUserDto: CreateUserDto, role: RoleEntity): Promise<HttpStatus.ACCEPTED>{
       const { email, password, name } = createUserDto;
       const user = this.create({
           email,
           name,
           password,
        //    role_id: role,
       })
       await this.save(user);
       return HttpStatus.ACCEPTED;
   }
}