import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
    
    @ManyToOne(type => QuizEntity, quiz => quiz.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'quizId', referencedColumnName: 'id' })
    quiz!: QuizEntity;

    @OneToMany(type => QuestionAnswersEntity, questionAnswers => questionAnswers.question, { onDelete: 'CASCADE' })
    answers!: QuestionAnswersEntity[];

}
