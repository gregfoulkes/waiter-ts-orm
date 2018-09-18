import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Waiter } from "./waiter";

@Entity()
export class Days extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day_name: string;

    @ManyToOne( type => Waiter, waiter => waiter.fullname )
    days : Days[]

}