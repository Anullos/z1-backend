import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question_entity";

@Entity()
export class QuestionAnswersEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    answer!: string;

    @Column({ nullable: false })
    questionId!: string;

    @ManyToOne(type => QuestionEntity, question => question.answers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'questionId', referencedColumnName: 'id' })
    question!: QuestionEntity;

}
