import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentLogUserEntity } from "./content_log_user";

@Entity()
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: false })
    role!: string;

    @Column({ nullable: false })
    created_at!: Date;

    @Column({ nullable: false })
    updated_at!: Date;

    @OneToOne(type => ContentLogUserEntity, contentlog => contentlog.user, { onDelete: 'CASCADE' })
    logs!: ContentLogUserEntity[];

}