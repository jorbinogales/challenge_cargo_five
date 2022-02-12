import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/role/entities/role.entity';
import { Roles } from 'src/role/interface/role';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _roleService: RoleService,
  ){}


  /* 
  * REGISTER USER SERVICE 
  */
  async register(createUserDto: CreateUserDto, role: Roles): Promise<HttpStatus.ACCEPTED>{
      const { email } = createUserDto;
      const user = await this.findByEmail(email);
      if(user){
        throw new BadRequestException('El usuario ya se encuentra registrado');
      }
      const role_entity = await this._roleService.findByRol(role);
      return await this.create(createUserDto, role_entity);
  }

  /* 
  * CREATE A USER 
  */
  async create(createUserDto: CreateUserDto, role: RoleEntity): Promise<HttpStatus.ACCEPTED>{
      return await this._userRepository.createUser(createUserDto, role);
  }


  /* 
  * FIND BY EMAIL USER 
  */
  async findByEmail(email: string): Promise<UserEntity>{
    return await this._userRepository.findOne({
      where: { email: email, deleted_at: null }
    });
  }

  /* 
  *GET USER BY ID
  */
 async get(user_id: number): Promise<UserEntity>{
  return await this._userRepository.findOne({
    where: {
      id: user_id,
    }
  })
 }

}
