import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Genre extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column("varchar")
    name!: string;
}
