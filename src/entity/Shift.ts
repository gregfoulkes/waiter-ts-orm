import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { Waiter } from "./Waiter";
import { Day } from "./Day";


@Entity()
export class Shift extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Waiter, waiter => waiter.shifts )
    waiter: Waiter;

    @ManyToOne( type => Day, day => day.shifts )
    weekday: Day;

}
