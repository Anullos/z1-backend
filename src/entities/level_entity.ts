import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";

@Entity()
export class LevelEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;
    
    @OneToMany(type => LessonEntity, lesson => lesson.level)
    lessons!: LessonEntity[];

}