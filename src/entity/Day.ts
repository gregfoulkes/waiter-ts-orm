import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Shift } from "./Shift";

@Entity()
export class Day extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    dayname: string;

    @OneToMany(type => Shift, shift => shift.weekday)
    shifts: Shift[];
}