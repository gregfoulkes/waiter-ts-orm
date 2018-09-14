import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Shifts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    waiter_id: number;

    @Column()
    weekday_id: number;


}
