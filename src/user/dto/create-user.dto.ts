import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto{
    

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "email", default: "admin@riqra.com"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "name", default: "name"})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", description: "password", default: "password"})
    password: string;

}