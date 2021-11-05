import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LevelEntity } from './level_entity';

@Entity()
export class LessonEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ nullable: false })
    levelId!: number;

    @ManyToOne(type => LevelEntity, level => level.lessons)
    @JoinColumn({ name: 'levelId' , referencedColumnName: 'id'})
    level!: LevelEntity;

}


