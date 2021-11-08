import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContentEntity } from "./content_entity";

@Entity()
export class TextEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    text!: string;

    @Column({ nullable: false })
    contentId!: number;

    @OneToOne(type => ContentEntity, content => content.text, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contentId', referencedColumnName: 'id' })
    content!: ContentEntity;

}
