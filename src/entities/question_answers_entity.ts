import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LessonEntity } from "./lesson_entity";
import { QuestionEntity } from "./question_entity";
import { QuizEntity } from "./quiz_entity";
@Entity()
export class QuestionAnswersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    answer!: string;

    @Column({ nullable: false })
    questionId!: string;

    @ManyToOne(type => QuestionEntity, question => question.answers)
    @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
    question!: QuestionEntity;

}
