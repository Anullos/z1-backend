import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentEntity } from "./content_entity";
import { ContentLogUserEntity } from "./content_log_user";
import { LevelEntity } from './level_entity';

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

    @ManyToOne(type => LevelEntity, level => level.lessons, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'levelId', referencedColumnName: 'id' })
    level!: LevelEntity;

    @OneToMany(type => ContentEntity, content => content.lesson, { onDelete: 'CASCADE' })
    contents!: ContentEntity[];

    @ManyToMany(type => ContentLogUserEntity, contentlog => contentlog.lesson, { onDelete: 'CASCADE' })
    logs!: ContentLogUserEntity[];

}
