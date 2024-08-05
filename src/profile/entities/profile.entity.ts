import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";


@Entity({name: 'profile'})
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: uuidv4;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: false })
    location: string

    @Column({ type: 'varchar', nullable: false })
    phoneNo: string

    @Column({ type: 'text', nullable: false})
    role: string;

    @Column({ type: 'text', nullable: false})
    status: string;

    @Column({ type: 'text', default:0})
    rentIncome: string;
}
