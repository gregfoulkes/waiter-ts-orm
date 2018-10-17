import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Shift } from "./Shift";

@Entity()
export class Waiter extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    position: string;

    @OneToMany( type => Shift, shift =>  shift.waiter )
    shifts : Shift[]
    
}