import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ContentEntity } from "./content_entity";
import { UserEntity } from './user_entity';

@Entity()
export class ContentLogUserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    contentId!: number;

    @Column({ nullable: false })
    userId!: number;

    @Column("simple-array", { nullable: false })
    answersUser!: string[];

    @OneToOne(type => ContentEntity, content => content.logs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contentId', referencedColumnName: 'id' })
    content!: ContentEntity;

    @ManyToOne(type => UserEntity, user => user.logs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user!: UserEntity;

}
