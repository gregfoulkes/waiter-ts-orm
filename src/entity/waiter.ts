import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Waiter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    fullname: string;

    @Column()
    position: string;

}