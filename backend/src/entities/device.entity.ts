import {
    Entity,
    Column,
    BaseEntity,
    ManyToMany,
    JoinTable,
    PrimaryColumn
} from "typeorm";
import { Genre } from "./genre.entity";

@Entity()
export class Movie extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column("varchar")
    title!: string;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres!: Genre[];
}
