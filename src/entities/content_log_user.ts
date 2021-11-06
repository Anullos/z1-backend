import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentEntity } from "./content_entity";
import { LessonEntity } from "./lesson_entity";
import { QuizEntity } from "./quiz_entity";
import { TextEntity } from "./text_entity";
import { UserEntity } from './user_entity';

@Entity()
export class ContentLogUserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    contentId!: number;

    @Column({ nullable: false })
    userId!: number;

    @Column({ nullable: false })
    answersUser!: string;


}
