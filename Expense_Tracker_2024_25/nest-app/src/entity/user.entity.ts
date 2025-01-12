import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"users"})
export class user{
    @PrimaryGeneratedColumn({type:"bigint"})
    id:number;
    @Column({unique:true})
    username:string;
    @Column()
    password:string;
    @Column()
    email:string;
    @Column({default:() => 'CURRENT_TIMESTAMP'})
    createDate:Date
}