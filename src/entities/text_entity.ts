import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";
@Entity()
export class TextEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    text!: string;

    @Column({ nullable: false })
    lessonId!: number;

    @ManyToOne(type => LessonEntity, lesson => lesson.texts)
    @JoinColumn({ name: 'lessonId', referencedColumnName: 'id' })
    lesson!: LessonEntity;

}
