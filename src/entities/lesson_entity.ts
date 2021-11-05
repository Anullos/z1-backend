import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LevelEntity } from './level_entity';

@Entity()
export class LessonEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => LevelEntity, {nullable: false})
    levelID!: LevelEntity;

}