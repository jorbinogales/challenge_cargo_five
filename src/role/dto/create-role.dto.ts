import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from '../interface/role';

export class CreateRoleDto{

    @IsEnum(Roles)
    @IsNotEmpty({ message: 'El ROl es requerido' })
    role: Roles;

}