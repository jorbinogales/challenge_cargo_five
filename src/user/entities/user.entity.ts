import { InternalServerErrorException } from "@nestjs/common";
import { RoleEntity } from "src/role/entities/role.entity";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email', type: 'varchar', length: '255', nullable: false, unique: true,})
    email: string;

    @Column({ name: 'name', type: 'varchar', length: '255', nullable: false, unique: true,})
    name: string;

    @Column({ name: 'password', type: 'varchar', length: '255', nullable: false})
    password: string;

    @ManyToOne(() => RoleEntity, role => role.id, { eager: true })
    @JoinColumn({ name: 'role_id'})
    role_id: RoleEntity;

    private tempPassword?: string;

    @AfterLoad()
    loadTempPassword? = () => {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    encryptPassword? =  async (): Promise<void> => {
        if (this.tempPassword !== this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10)
        
            } catch (e) {
                throw new InternalServerErrorException('there are some issiue in the hash')
        
            }
        }
    }

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    deleted_at?: Date;

}
