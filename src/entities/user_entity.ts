import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;
}