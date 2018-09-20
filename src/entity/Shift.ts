import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Waiter } from "./Waiter";
import { Day } from "./Day";


@Entity()
export class Shift {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => Waiter, waiter => waiter.shifts )
    waiter: Waiter;

    @ManyToOne( type => Day, day => day.shifts )
    weekday: Day;

}
