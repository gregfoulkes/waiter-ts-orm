import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import { User } from "./User";
import { Day } from "./Day";


@Entity()
export class Shift extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne( type => User, user => user.shifts )
    user: User;

    @ManyToOne( type => Day, day => day.shifts )
    weekday: Day;

}
