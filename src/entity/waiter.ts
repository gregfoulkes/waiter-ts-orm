import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Shift } from "./shifts";

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

    @OneToMany( type => Shift, shift => shift.waiter )
    shifts : Shift[]
    
}