import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContentLogUserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    contentId!: number;

    @Column({ nullable: false })
    userId!: number;

    @Column({ nullable: false })
    answersUser!: string;


}
