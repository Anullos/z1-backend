import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";
import { QuizEntity } from "./quiz_entity";
@Entity()
export class QuestionEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    question!: string;

    @Column({ nullable: false })
    type!: string;

    @Column({ nullable: false })
    answers!: string;

    @Column({ nullable: false })
    quizId!: number;

    @ManyToOne(type => QuizEntity, quiz => quiz.questions)
    @JoinColumn({ name: 'lessonId', referencedColumnName: 'id' })
    quiz!: QuizEntity;

}
