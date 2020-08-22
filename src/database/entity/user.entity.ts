import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity('User')   
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    UserId:string;

    @Column()
    Username:string;

    @Column()
    Password:string;

    @Column()
    DeviceId:string;

    @Column()
    Createddatetime:string
}