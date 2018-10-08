import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Shift } from "./Shift";

@Entity()
export class Waiter extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    fullname: string;

    @Column()
    position: string;

    @OneToMany( type => Shift, shift =>{return shift.waiter} )
    shifts : Shift[]
    
}