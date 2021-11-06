import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentEntity } from "./content_entity";

@Entity()
export class QuizEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    contentId!: number;

    @OneToOne(type => ContentEntity, content => content.quiz)
    @JoinColumn({ name: 'contentId', referencedColumnName: 'id' })
    content!: ContentEntity;

    @OneToMany(type => QuizEntity, quiz => quiz.questions)
    questions!: QuizEntity[];

}
