import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";
import { QuizEntity } from "./quiz_entity";
import { TextEntity } from "./text_entity";
@Entity()
export class ContentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    lessonId!: number;

    @ManyToOne(type => LessonEntity, lesson => lesson.contents)
    @JoinColumn({ name: 'lessonId', referencedColumnName: 'id' })
    lesson!: LessonEntity;

    @OneToOne(type => TextEntity, text => text.content)
    text!: TextEntity;

    @OneToOne(type => QuizEntity, quiz => quiz.content)
    quiz!: QuizEntity;



}
