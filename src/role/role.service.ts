import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Roles } from './interface/role';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {

    constructor(
      @InjectRepository(RoleRepository)
      private readonly _roleRepository: RoleRepository,
    )
    {}
  
   /*
    FIND ROW BY NAME 
    */
    async findByRol(role: Roles): Promise<RoleEntity>{
        return await this._roleRepository.findOne({
            where: { 
                role: role
            }
        })
    }
  
}
