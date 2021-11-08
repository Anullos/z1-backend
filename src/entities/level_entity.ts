import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";

@Entity()
export class LevelEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: false })
    description!: string;

    @OneToMany(type => LessonEntity, lesson => lesson.level, { onDelete: 'CASCADE' })
    lessons!: LessonEntity[];

}