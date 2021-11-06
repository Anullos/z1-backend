import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LevelEntity } from './level_entity';
import { TextEntity } from "./text_entity";

@Entity()
export class LessonEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: false })
    description!: string;

    @Column({ nullable: false })
    levelId!: number;

    @ManyToOne(type => LevelEntity, level => level.lessons)
    @JoinColumn({ name: 'levelId', referencedColumnName: 'id' })
    level!: LevelEntity;

    @OneToMany(type => TextEntity, text => text.lesson)
    texts!: TextEntity[];

}


