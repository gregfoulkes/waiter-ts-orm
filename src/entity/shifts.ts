import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Waiter } from "./waiter";


@Entity()
export class Shift {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Waiter, waiter => waiter.shifts )
    waiter: Waiter;

    @Column()
    weekday_id: number;

}
