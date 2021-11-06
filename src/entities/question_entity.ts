import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";
import { QuestionAnswersEntity } from "./question_answers_entity";
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
    quizId!: number;

    @OneToMany(type => QuestionAnswersEntity, questionAnswers => questionAnswers.question)
    answers!: QuestionAnswersEntity[];

    @ManyToOne(type => QuizEntity, quiz => quiz.questions)
    @JoinColumn({ name: 'quizId', referencedColumnName: 'id' })
    quiz!: QuizEntity;

}
